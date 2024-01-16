import * as React from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Divider from "@mui/material/Divider"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"

const style = {
  py: 0,
  width: "100%",
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper"
}

const questionMarkStyle = {
  fontSize: "medium",
  ml: "3px",
  opacity: "0.3"
}

export default function DividerVariants() {
  return (
    <List sx={style}>
      <ListItem>
        <div className="flex justify-between items-center w-full">
               <span>
           Market Cap
                 <HelpOutlineIcon sx={questionMarkStyle} />
         </span>
          <span>$ 400,000,000</span>
        </div>
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <div className="flex justify-between items-center w-full">
          <span>
             Volume (24h)
                             <HelpOutlineIcon sx={questionMarkStyle} />

         </span>
          <span>$ 400,000</span>
        </div>
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <div className="flex justify-between items-center w-full">
               <span>
           Circulating Supply
                                  <HelpOutlineIcon sx={questionMarkStyle} />

         </span>
          <span>450,000,000</span>
        </div>
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <div className="flex justify-between items-center w-full">
                 <span>
           Max Supply
                                    <HelpOutlineIcon sx={questionMarkStyle} />

         </span>
          <span>-</span>
        </div>
      </ListItem>
    </List>
  )
}
