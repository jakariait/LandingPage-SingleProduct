import React from "react";
import LayoutAdmin from "../component/componentAdmin/LayoutAdmin.jsx";
import CarouselUpload from "../component/componentAdmin/CarouselUpload.jsx";
import Breadcrumb from "../component/componentAdmin/Breadcrumb.jsx";
import RequirePermission from "../component/componentAdmin/RequirePermission.jsx";

const SliderBannerPage = () => {
  return (
    <LayoutAdmin>
      <Breadcrumb
        title={"View All Sliders and Banners"}
        pageDetails={"WEBSITE CONFIG"}
      />
      <RequirePermission permission="sliders-banners">
        <CarouselUpload />
      </RequirePermission>
    </LayoutAdmin>
  );
};

export default SliderBannerPage;
