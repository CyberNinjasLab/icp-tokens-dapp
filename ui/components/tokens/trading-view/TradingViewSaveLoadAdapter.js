class TradingViewSaveLoadAdapter {
  constructor(contract, currency, backendCoreActor, isAuthenticated) {
    this._contract = contract;
    this._currency = currency;
    this._backendCoreActor = backendCoreActor;
    this._isAuthenticated = isAuthenticated;
    this._isDirty = false;

    this._initStorage().then(() => {
      setInterval(() => {
        if (this._isDirty) {
          this._saveAllToStorage();
          this._isDirty = false;
        }
      }, 1000);
    });
  }

  async _initStorage() {
    this._charts = (await this._getFromStorage('StorageSaveLoadAdapter_charts')) || [];
    this._studyTemplates = (await this._getFromStorage('StorageSaveLoadAdapter_studyTemplates')) || [];
    this._drawingTemplates = (await this._getFromStorage('StorageSaveLoadAdapter_drawingTemplates')) || [];
    this._chartTemplates = (await this._getFromStorage('StorageSaveLoadAdapter_chartTemplates')) || [];
    this._drawings = (await this._getFromStorage('StorageSaveLoadAdapter_drawings')) || {};
  }

  async getAllCharts() {
    return (await this._getFromStorage('StorageSaveLoadAdapter_charts')) || [];
  }

  async removeChart(id) {
    this._charts = this._charts.filter(chart => chart.id !== id);
    this._isDirty = true;
  }

  async saveChart(chartData) {
    if (!chartData.id) {
      chartData.id = this._generateUniqueChartId();
    } else {
      await this.removeChart(chartData.id);
    }
    const savedChartData = { ...chartData, id: chartData.id, timestamp: Math.round(Date.now() / 1000) };
    this._charts.push(savedChartData);
    this._isDirty = true;
    return savedChartData.id;
  }

  async getChartContent(id) {
    this._charts = await this.getAllCharts();
    const chart = this._charts.find(chart => chart.id === id);
    if (chart) {
      return chart.content;
    } else {
      throw new Error('The chart does not exist');
    }
  }

  async removeStudyTemplate(studyTemplateData) {
    this._studyTemplates = this._studyTemplates.filter(template => template.name !== studyTemplateData.name);
    this._isDirty = true;
  }

  async getStudyTemplateContent(studyTemplateData) {
    const template = this._studyTemplates.find(template => template.name === studyTemplateData.name);
    if (template) {
      return template.content;
    } else {
      throw new Error('The study template does not exist');
    }
  }

  async saveStudyTemplate(studyTemplateData) {
    this._studyTemplates = this._studyTemplates.filter(template => template.name !== studyTemplateData.name);
    this._studyTemplates.push(studyTemplateData);
    this._isDirty = true;
  }

  async getAllStudyTemplates() {
    return this._studyTemplates;
  }

  async removeDrawingTemplate(toolName, templateName) {
    this._drawingTemplates = this._drawingTemplates.filter(template => template.name !== templateName || template.toolName !== toolName);
    this._isDirty = true;
  }

  async loadDrawingTemplate(toolName, templateName) {
    const template = this._drawingTemplates.find(template => template.name === templateName && template.toolName === toolName);
    if (template) {
      return template.content;
    } else {
      throw new Error('The drawing template does not exist');
    }
  }

  async saveDrawingTemplate(toolName, templateName, content) {
    this._drawingTemplates = this._drawingTemplates.filter(template => template.name !== templateName || template.toolName !== toolName);
    this._drawingTemplates.push({ name: templateName, content: content, toolName: toolName });
    this._isDirty = true;
  }

  async getDrawingTemplates() {
    return this._drawingTemplates.map(template => template.name);
  }

  async getAllChartTemplates() {
    return this._chartTemplates.map(template => template.name);
  }

  async saveChartTemplate(templateName, content) {
    const template = this._chartTemplates.find(template => template.name === templateName);
    if (template) {
      template.content = content;
    } else {
      this._chartTemplates.push({ name: templateName, content });
    }
    this._isDirty = true;
  }

  async removeChartTemplate(templateName) {
    this._chartTemplates = this._chartTemplates.filter(template => template.name !== templateName);
    this._isDirty = true;
  }

  async getChartTemplateContent(templateName) {
    const template = this._chartTemplates.find(template => template.name === templateName);
    return { content: structuredClone(template.content) };
  }

  async saveLineToolsAndGroups(layoutId, chartId, state) {
    const drawings = state.sources;
    if (!drawings) return;

    const drawingKey = this._getDrawingKey(layoutId, chartId);
    if (!this._drawings[drawingKey]) {
      this._drawings[drawingKey] = {};
    }

    for (let [key, state] of drawings) {
      if (state === null) {
        delete this._drawings[drawingKey][key];
      } else {
        this._drawings[drawingKey][key] = state;
      }
    }
    this._isDirty = true;
  }

  async loadLineToolsAndGroups(layoutId, chartId) {
    if (!layoutId) {
      return null;
    }

    const drawingKey = this._getDrawingKey(layoutId, chartId);
    const rawSources = this._drawings[drawingKey];
    if (!rawSources) return null;

    const sources = new Map(Object.entries(rawSources));
    return { sources };
  }

  _generateUniqueChartId() {
    const existingIds = this._charts.map(chart => chart.id);
    let uid;
    do {
      uid = Math.random().toString(16).slice(2);
    } while (existingIds.includes(uid));
    return uid;
  }

  async _getFromStorage(key) {
    if (this._isAuthenticated) {
      const data = await this._backendCoreActor.getTradingViewChartData(key + '_' + this._contract + '_' + this._currency);
      return data && data.length ? JSON.parse(data[0][1]) : null;
    } else {
      const data = window.localStorage.getItem(key + '_' + this._contract + '_' + this._currency);
      return data ? JSON.parse(data) : null;
    }
  }

  async _saveToStorage(key, data) {
    if (this._isAuthenticated) {
      await this._backendCoreActor.storeTradingViewChartData(key + '_' + this._contract + '_' + this._currency, JSON.stringify(data));
    } else {
      window.localStorage.setItem(key + '_' + this._contract + '_' + this._currency, JSON.stringify(data));
    }
  }

  async _saveAllToStorage() {
    await Promise.all([
      this._saveToStorage('StorageSaveLoadAdapter_charts', this._charts),
      this._saveToStorage('StorageSaveLoadAdapter_studyTemplates', this._studyTemplates),
      this._saveToStorage('StorageSaveLoadAdapter_drawingTemplates', this._drawingTemplates),
      this._saveToStorage('StorageSaveLoadAdapter_chartTemplates', this._chartTemplates),
      this._saveToStorage('StorageSaveLoadAdapter_drawings', this._drawings)
    ]);
  }

  _getDrawingKey(layoutId, chartId) {
    return `${layoutId}/${chartId}`;
  }
}

export default TradingViewSaveLoadAdapter;
