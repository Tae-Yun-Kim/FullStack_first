import { Suspense, lazy } from "react";
import NavigationMenu from "../components/menus/NavigationMenu";

const KoreanFoodPage = lazy(() => import("../pages/foodpages/KoreanFoodPage"));
const JapaneseFoodPage = lazy(() => import("../pages/foodpages/JapaneseFoodPage"));
const ChineseFoodPage = lazy(() => import("../pages/foodpages/ChineseFoodPage"));
const WesternFoodPage = lazy(() => import("../pages/foodpages/WesternFoodPage"));
const EtcFoodPage = lazy(() => import("../pages/foodpages/EtcFoodPage"));
const MealKitPage = lazy(() => import("../pages/foodpages/MealKitPage"));
const CustomizeProductPage = lazy(() => import("../pages/foodpages/CustomizeProductPage"));
const SearchResultPage = lazy(() => import("../pages/foodpages/SearchResultPage"));

const Loading = <div>Loading...</div>;

const foodRouter = () => [
  { path: "koreanfood", element: <Suspense fallback={Loading}><NavigationMenu /><KoreanFoodPage /></Suspense> },
  { path: "japanesefood", element: <Suspense fallback={Loading}><NavigationMenu /><JapaneseFoodPage /></Suspense> },
  { path: "chinesefood", element: <Suspense fallback={Loading}><NavigationMenu /><ChineseFoodPage /></Suspense> },
  { path: "westernfood", element: <Suspense fallback={Loading}><NavigationMenu /><WesternFoodPage /></Suspense> },
  { path: "etcfood", element: <Suspense fallback={Loading}><NavigationMenu /><EtcFoodPage /></Suspense> },
  { path: "mealkit/:mid", element: <Suspense fallback={Loading}><NavigationMenu /><MealKitPage /></Suspense> },
  { path: "mealkit/:mid/customize", element: <Suspense fallback={Loading}><NavigationMenu /><CustomizeProductPage /></Suspense> },
  { path: "search", element: <Suspense fallback={Loading}><NavigationMenu /><SearchResultPage /></Suspense> },
];

export default foodRouter;
