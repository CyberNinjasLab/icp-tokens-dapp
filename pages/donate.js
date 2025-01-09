import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import Layout from '../ui/components/_base/Layout';
import { useState } from 'react';
import CopyButton from '../ui/components/_base/CopyButton';

const Donations = () => {
    const [toggleValue, setToggleValue] = useState("ICP");
    const isICP = toggleValue === "ICP";

    return (
        <Layout>
            <div className='w-full text-center md:mt-6'>
                <span className='text-center block text-2xl md:text-2xl font-semibold'>
								Your help matters ❤️
								</span>
                <div className='mt-8 '>
                    <div className='border-gray-500 bg-gray-900/60 border shadow-xl rounded-xl inline-block px-8 py-6 lg:px-10 lg:py-8 w-full sm:w-auto sm:min-w-[440px]'>
                        <ToggleButtonGroup
                            value={toggleValue}
                            exclusive
                            onChange={(event, currentSelection) => setToggleValue(toggleValue)}
                            color="primary"
                            sx={{
                                gap: '10px',
                                flexWrap: 'wrap',
                                '& .Mui-selected': { color: 'primary' },
                                '& .MuiToggleButtonGroup-grouped': {
                                    fontWeight: 'normal',
                                    flexGrow: 1,
                                    borderRadius: '40px !important',
                                    border: 'none !important',
                                    marginTop: 0,
                                    textTransform:"none"
                                }
                            }}
                        >
                            <Tooltip title="Internet Computer Token">
                                <ToggleButton value="ICP">
                                    <img src="/tokens/icp.png" className='w-7 h-7 mr-2' />
                                    ICP
                                </ToggleButton>
                            </Tooltip>
                        </ToggleButtonGroup>
                        <div className='mt-6 text-center mb-4'>
                            <div>
                                <img src={isICP ? "/qr/AID.png" : "/qr/PID.png"} className='w-52 h-52 inline-block' />
                                <div className='mt-3'>
                                    <span className='relative inline-block break-words leading-4 max-w-[210px] pr-8 sm:max-w-[270px]'>
                                        {isICP 
                                            ? "67d3e28f5bd25c79ca6e2e39acc43831794def163cbe0475e03a59b56e97b933"
                                            : "djeau-aivho-uyrm3-wqglm-oxb4y-imkyo-cus4h-fi3hw-alswa-wcv7l-bae"}
                                        <span className='inline-block absolute right-1 top-1/2 transform -translate-y-1/2 ml-2'>
                                            <CopyButton value={isICP ? "67d3e28f5bd25c79ca6e2e39acc43831794def163cbe0475e03a59b56e97b933" : "djeau-aivho-uyrm3-wqglm-oxb4y-imkyo-cus4h-fi3hw-alswa-wcv7l-bae"} />
                                        </span>	
                                    </span>
                                </div>
                            </div>
                        </div>
												<div className=' font-semibold mt-8'>
													Thank you for your support 🙏
												</div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Donations;