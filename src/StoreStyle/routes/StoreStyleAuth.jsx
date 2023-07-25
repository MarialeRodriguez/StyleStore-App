import { Navigate, Route, Routes } from "react-router-dom"
import { StorePage } from "../pages/StorePage"
import { DashboardPage } from "../pages/DashboardPage"
import { DetailArticle } from "../pages/DetailArticle"
import { CheckOut } from "../pages/CheckOut"


export const StoreStyleAuth = () => {
  return (
    <Routes>
        <Route path="/home" element={ <StorePage /> } />
        <Route path="dashboard" element={ <DashboardPage /> } />
        <Route path="article-detail" element={ <DetailArticle/> }/>
        <Route path="checkout" element={ <CheckOut /> }/>
        

        <Route path="/*" element={ <Navigate to="/home" /> } />
    </Routes>
  )
}