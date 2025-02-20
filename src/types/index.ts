
export type TransactionType = "income" | "expense";
export type IncomeCategory = "給与" | "副収入" | "お小遣い";
export type ExpenseCategory = "食費"| "日用品"| "住居費"| "交際費"| "娯楽"| "交通費";

// interface型では上記のような記述ができないのでtypeで定義して
// interface型に組み込む

export interface Transaction {
  id: string,
  date: string,
  amount: number,
  content: string,
  type: TransactionType,
  category: IncomeCategory | ExpenseCategory;
}

export interface Balance {
  income: number,
  expense: number,
  balance: number,
}

export interface CalendarContent {
  start: string,
  income: string,  //日本円表示である1,000円のように3桁区切りを使いたいのでstringとして扱う
  expense: string,
  balance: string,
}
