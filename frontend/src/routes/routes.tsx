import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Items, AddItems, CustomDues, NewBill, StoreManager } from "../pages";
import { HomePageCard } from "../pages/home-tails/hose-tails";

export const storManagerElementRoutes = createRoutesFromElements(

    <Route path="/" Component={StoreManager}>
        <Route index Component={HomePageCard} />
        <Route path='show-items' Component={Items} />
        <Route path="app-items" Component={AddItems} />
        <Route path="new-bill" Component={NewBill} />
        <Route path="customer-dues" Component={CustomDues} />
    </Route>

);

export const storeManagerBrowserRouter = createBrowserRouter(storManagerElementRoutes);

