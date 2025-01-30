import { Box } from "@mui/material"
import MonthlySummary from "../components/MonthlySummary"
import Calendar from "../components/Calendar"
import TransactionMenu from "../components/TransactionMenu"
import TransactionFrom from "../components/TransactionFrom"


const Home = () => {
  return (
    <Box sx={{display: "flex"}}>
      {/* 左側コンテンツ */}
      <Box sx={{flexGrow: 1, bgcolor: "pink"}}>
        <MonthlySummary />
        <Calendar />
      </Box>
      {/* 右側コンテンツ */}
      <Box>
        <TransactionMenu />
        <TransactionFrom />
      </Box>
    </Box>
  )
}

export default Home
