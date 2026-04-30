import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import useColorStore from "./store/ColorStore.js";
import GeneralInfoStore from "./store/GeneralInfoStore.js";
import CarouselStore from "./store/CarouselStore.js";
import FeatureStore from "./store/FeatureStore.js";
import CategoryStore from "./store/useCategoryStore.js";
import SubCategoryStore from "./store/useSubCategoryStore.js";
import useSocialMediaLinkStore from "./store/SocialMediaLinkStore.js";
import useProductSizeStore from "./store/useProductSizeStore.js";
import useFlagStore from "./store/useFlagStore.js";
import useChildCategoryStore from "./store/useChildCategoryStore.js";
import useProductStore from "./store/useProductStore.js";
import useAuthUserStore from "./store/AuthUserStore.js";
import ProtectedRoute from "./component/componentAdmin/ProtectedRoute.jsx";
import ScrollToTop from "./component/componentGeneral/ScrollToTop.jsx";
import MetaProvider from "./component/componentGeneral/MetaProvider.jsx";
import ScrollToTopButton from "./component/componentGeneral/ScrollToTopButton.jsx";
import { setFaviconFromApi } from "./utils/setFavicon.js";
import GeneralInfoPage from "./pagesAdmin/GeneralInfoPage.jsx";
import HomePage from "./pagesUser/HomePage.jsx";
import SliderBannerPage from "./pagesAdmin/SliderBannerPage.jsx";
import AdminLogin from "./component/componentAdmin/AdminLogin.jsx";
import NotFoundPage from "./pagesUser/NotFoundPage.jsx";
import AddNewCategoryPage from "./pagesAdmin/AddNewCategoryPage.jsx";
import CategoryListPage from "./pagesAdmin/CategoryListPage.jsx";
import EditCategoryPage from "./pagesAdmin/EditCategoryPage.jsx";
import AddNewProductSizePage from "./pagesAdmin/AddNewProductSizePage.jsx";
import ProductSizeListPage from "./pagesAdmin/ProductSizeListPage.jsx";
import EditProductSizePage from "./pagesAdmin/EditProductSizePage.jsx";
import ViewAllProductPage from "./pagesAdmin/ViewAllProductPage.jsx";
import EditProductPage from "./pagesAdmin/EditProductPage.jsx";
import DeliveryChargePage from "./pagesAdmin/DeliveryChargePage.jsx";
import ConfigSetupPage from "./pagesAdmin/ConfigSetupPage.jsx";
import ThankYouPage from "./pagesUser/ThankYouPage.jsx";
import AllOrdersPage from "./pagesAdmin/AllOrdersPage.jsx";
import PendingOrdersPage from "./pagesAdmin/PendingOrdersPage.jsx";
import ApprovedOrdersPage from "./pagesAdmin/ApprovedOrdersPage.jsx";
import InTransitOrdersPage from "./pagesAdmin/InTransitOrdersPage.jsx";
import DeliveredOrdersPage from "./pagesAdmin/DeliveredOrdersPage.jsx";
import ReturnedOrdersPage from "./pagesAdmin/ReturnedOrdersPage.jsx";
import CancelledOrdersPage from "./pagesAdmin/CancelledOrdersPage.jsx";
import ViewOrderPage from "./pagesAdmin/ViewOrderPage.jsx";
import CouponPage from "./pagesAdmin/CouponPage.jsx";
import AdminMetaPage from "./pagesAdmin/AdminMetaPage.jsx";
import BKashConfigPage from "./pagesAdmin/BKashConfigPage.jsx";
import SteadFastConfigPag from "./pagesAdmin/SteadFastConfigPag.jsx";
import DashboardPage from "./pagesAdmin/DashboardPage.jsx";
import AbandonedCartPage from "./pagesAdmin/AbandonedCartPage.jsx";
import AdminListPage from "./pagesAdmin/AdminListPage.jsx";
import CreateAdminPage from "./pagesAdmin/CreateAdminPage.jsx";
import EditAdminPage from "./pagesAdmin/EditAdminPage.jsx";
import PathaoConfigPage from "./pagesAdmin/PathaoConfigPage.jsx";
import AddNewProductPage from "./pagesAdmin/AddNewProductPage.jsx";
import AmazfitWatch from "./component/AmazfitWatch.jsx";
import AmazfitWatchPage from "./pagesUser/AmazfitWatchPage.jsx";

function App() {
  const { GeneralInfoListRequest, GeneralInfoList } = GeneralInfoStore();
  const { CarouselStoreListRequest } = CarouselStore();
  const { FeatureStoreListRequest } = FeatureStore();
  const { fetchColors, colors } = useColorStore(); // ✅ Extract colors
  const { fetchSocialMediaLinks } = useSocialMediaLinkStore();
  const { fetchCategories } = CategoryStore();
  const { fetchSubCategories } = SubCategoryStore();
  const { fetchProductSizes } = useProductSizeStore();
  const { fetchFlags } = useFlagStore();
  const { fetchChildCategories } = useChildCategoryStore();
  const { fetchProducts, fetchProductsAdmin, fetchHomeProducts } =
    useProductStore();
  const { initialize } = useAuthUserStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          GeneralInfoListRequest(),
          CarouselStoreListRequest(),
          FeatureStoreListRequest(),
          fetchColors(),
          fetchSocialMediaLinks(),
          fetchCategories(),
          fetchSubCategories(),
          fetchProductSizes(),
          fetchFlags(),
          fetchChildCategories(),
          fetchProducts(),
          fetchProductsAdmin(),
          initialize(),
          fetchHomeProducts(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // ✅ Empty dependency array to prevent unnecessary re-renders

  useEffect(() => {
    if (colors) {
      document.documentElement.style.setProperty(
        "--primaryColor",
        colors.primaryColor,
      );
      document.documentElement.style.setProperty(
        "--secondaryColor",
        colors.secondaryColor,
      );
      document.documentElement.style.setProperty(
        "--tertiaryColor",
        colors.tertiaryColor,
      );
      document.documentElement.style.setProperty(
        "--accentColor",
        colors.accentColor,
      );
    }
  }, [colors]); // ✅ This effect will run only when colors change

  setFaviconFromApi(GeneralInfoList?.Favicon); // Favicon

  return (
    <Router>
      <MetaProvider />
      <ScrollToTop />
      <ScrollToTopButton />
      <Routes>
        {/* General User Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/akher-lal-chini" element={<HomePage />} />
        <Route path="/amazfit-watch" element={<AmazfitWatchPage/>} />

        <Route path="/thank-you/:orderId" element={<ThankYouPage />} />

        {/*Admin Login Page*/}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/general-info" element={<GeneralInfoPage />} />

          <Route path="/admin/sliders-banners" element={<SliderBannerPage />} />

          {/* Category Routes */}
          <Route
            path="/admin/addnewcategory"
            element={<AddNewCategoryPage />}
          />
          <Route path="/admin/categorylist" element={<CategoryListPage />} />
          <Route
            path="/admin/edit-category/:id"
            element={<EditCategoryPage />}
          />

          {/* Product Size Routes */}
          <Route
            path="/admin/add-product-size"
            element={<AddNewProductSizePage />}
          />
          <Route
            path="/admin/product-sizes"
            element={<ProductSizeListPage />}
          />
          <Route
            path="/admin/edit-product-size/:id"
            element={<EditProductSizePage />}
          />

          {/* Product Routes */}
          <Route
            path="/admin/addnewproduct"
            element={<AddNewProductPage />}
          />
          <Route
            path="/admin/viewallproducts"
            element={<ViewAllProductPage />}
          />
          <Route
            path="/admin/edit-product/:slug"
            element={<EditProductPage />}
          />

          {/*Delivery Charges Routes*/}
          <Route
            path="/admin/deliverycharge"
            element={<DeliveryChargePage />}
          />

          <Route path="/admin/configsetup" element={<ConfigSetupPage />} />

          {/*Orders Routes*/}
          <Route path="/admin/allorders" element={<AllOrdersPage />} />
          <Route path="/admin/pendingorders" element={<PendingOrdersPage />} />
          <Route
            path="/admin/approvedorders"
            element={<ApprovedOrdersPage />}
          />
          <Route
            path="/admin/intransitorders"
            element={<InTransitOrdersPage />}
          />

          <Route
            path="/admin/deliveredorders"
            element={<DeliveredOrdersPage />}
          />
          <Route
            path="/admin/returnedorders"
            element={<ReturnedOrdersPage />}
          />
          <Route
            path="/admin/cancelledorders"
            element={<CancelledOrdersPage />}
          />

          <Route path="/admin/orders/:orderId" element={<ViewOrderPage />} />

          <Route path="/admin/coupon" element={<CouponPage />} />
          <Route path="/admin/homepage-seo" element={<AdminMetaPage />} />
          <Route path="/admin/bkash-config" element={<BKashConfigPage />} />
          <Route
            path="/admin/steadfast-config"
            element={<SteadFastConfigPag />}
          />

          <Route path="/admin/pathao-config" element={<PathaoConfigPage />} />

          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/adminlist" element={<AdminListPage />} />
          <Route path="/admin/createadmin" element={<CreateAdminPage />} />
          <Route path="/admin/edit/:id" element={<EditAdminPage />} />

          <Route
            path="/admin/incomplete-order"
            element={<AbandonedCartPage />}
          />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
