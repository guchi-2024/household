
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
// import './App.css'
import Home from './pages/Home'
import Report from './pages/Report'
import NoMactch from './pages/NoMactch'
import AppLayout from './components/layout/AppLayout'
import { ThemeProvider } from '@emotion/react'
import { theme } from './theme/theme'
import { CssBaseline } from '@mui/material'
import { Transaction } from './types/index'
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase'
import { format } from "date-fns";
import { formatMonth } from './utils/formatting'


function App() {
  // Firebaseのエラーか一般的なエラーかを判定
  function isFireStoreError(err: unknown):err is {code: string, message: string} {
    return typeof err === "object" && err !== null && "code" in err  
  } 

  // Firebaseから取得したデータを格納する変数
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // 現在の日付を取得して変数に格納 *Date関数はTypescriptがdate型と推測するので型記述の必要はない
  const [currentMonth, setCurrentMonth] = useState(new Date());
  


  useEffect(() => {
    const fecheTransactions = async() => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        console.log(querySnapshot);

        const transactionsData = querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction
        });
        console.log(transactionsData)
        setTransactions(transactionsData)

      } catch(err) {
        if(isFireStoreError(err)) {
          console.log("Firebaseのエラーは:" ,err)
          console.log("Firebaseのエラーメッセージは:" ,err.message)
          console.log("Firebaseのエラーコードは:" ,err.code)
        } else {
          console.error("一般的なエラーは:" ,err)
        }
        // error
      }
    }
    fecheTransactions();
   
  }, [])

  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth))
  })
  
  console.log(monthlyTransactions);

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />  
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route 
              path="/" 
              element={
                <Home 
                  monthlyTransactions={monthlyTransactions} 
                  setCurrentMonth={setCurrentMonth}
                />
              }
            />
            <Route path="/report" element={<Report />}/>
            <Route path="/*" element={<NoMactch />}/>
          </Route>
        </Routes>
      </Router>
   </ThemeProvider> 
  )
}

export default App
