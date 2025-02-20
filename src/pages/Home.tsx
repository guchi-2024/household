import { Box } from "@mui/material"
import MonthlySummary from "../components/MonthlySummary"
import Calendar from "../components/Calendar"
import TransactionMenu from "../components/TransactionMenu"
import TransactionFrom from "../components/TransactionFrom"
import { Transaction } from "../types"

interface HomeProps {
  monthlyTransactions: Transaction[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
}


const Home = ({monthlyTransactions, setCurrentMonth}: HomeProps) => {
  return (
    <Box sx={{display: "flex"}}>
      {/* 左側コンテンツ */}
      <Box sx={{flexGrow: 1}}>
        <MonthlySummary monthlyTransactions={monthlyTransactions}/>
        <Calendar monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth}/>
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
