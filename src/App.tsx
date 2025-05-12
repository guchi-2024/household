
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
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from './firebase'
import { format } from "date-fns";
import { formatMonth } from './utils/formatting'
import { Schema } from './validations/schema'


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
  
  // ひと月のデータのみ取得
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth))
  })


  // 保存処理
  const handleSaveTransaction = async(transaction: Schema) => {
    try {
      // firestoreにデータを保存
      const docRef = await addDoc(collection(db, "Transactions"), transaction);
      console.log("docRef.id:", docRef.id);
      
      // リロードする前に追加内容を反映させる(セクション 50)
      const newTransaction = {
        id: docRef.id,
        ...transaction,
      } as Transaction;
      setTransactions((prevTransaction) => [...prevTransaction, newTransaction]);

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
  
  // 削除処理
  const handleDeleteTransaction = async(transactionId: string) => {
    //firestoreのデータ削除
    try {
      await deleteDoc(doc(db, "Transactions", transactionId));

      // リロードする前に削除内容を反映させる(セクション 56)
      const filterdTransactions = transactions.filter((transaction) => transaction.id !== transactionId);
      setTransactions(filterdTransactions);

    } catch(err) {
      if(isFireStoreError(err)) {
        console.log("Firebaseのエラーは:" ,err)
        console.log("Firebaseのエラーメッセージは:" ,err.message)
        console.log("Firebaseのエラーコードは:" ,err.code)
      } else {
        console.error("一般的なエラーは:" ,err)
      }
    }  
   }
  
  // 更新処理
  const handleUpdateTransaction = async(transaction: Schema, transactionId: string) => {
    try {
      const docRef = doc(db, "Transactions", transactionId);
      await updateDoc(docRef, transaction);
      
      // リロードする前に更新内容を反映させる
      // スプレット構文を使ってオブジェクトを更新 (セクション 59)
      const updatedTransactions = transactions.map((t) => 
        t.id === transactionId ? {...t, ...transaction} : t) as Transaction[];
        console.log("内容更新:", updatedTransactions);
        setTransactions(updatedTransactions);
      
    } catch(err) {
      if(isFireStoreError(err)) {
        console.log("Firebaseのエラーは:" ,err)
        console.log("Firebaseのエラーメッセージは:" ,err.message)
        console.log("Firebaseのエラーコードは:" ,err.code)
      } else {
        console.error("一般的なエラーは:" ,err)
      }

    }
  }
  

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
                  onSaveTransaction={handleSaveTransaction}
                  onDeleteTransaction={handleDeleteTransaction}
                  onUpdateTransaction={handleUpdateTransaction}
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
