import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import BuyPackageModal from "./Modal/BuyPackageModal";
import * as actions from "../../store/Actions/Index";

const stripePromise = loadStripe(
  "pk_test_51JubBQHL0vzqptWx1RCKjM8kkJ4V6kyG8eJSQn1n6m0VrJ3hPvbc6M5x6fTOeA0WecChbF6NXTEX66slFAMYW7EQ00wHOpAT20"
);

const PackagesPricingScreen = ({
  SubscriptionReducer,
  UserReducer,
  getAllSubscriptionPlans,
}) => {
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [userCurrentPackage, setUserCurrentPackage] = useState("");
  let [packages, setPackages] = useState([]);

  useEffect(() => {
    getAllSubscriptionPlans();
  }, []);

  useEffect(() => {
    setPackages(SubscriptionReducer);
    setUserCurrentPackage(UserReducer.plan_id);
  }, [SubscriptionReducer, UserReducer]);

  return (
    <>
      <main className="main-container">
        <section className="section-coverage-main">
          <div className="row">
            {packages.map((item, i) => {
              if (item.plan_id === 1) {
                return;
              }
              return (
                <div key={i} className="col-lg-3 col-md-6 mt-3">
                  <div className="border-pricing">
                    <div className="card-pricing-main">
                      <div className="for-btn-bottom">
                        <div className="card-pricing-header">
                          <h3>{item.plan_title}</h3>
                          <p>
                            ${item.plan_price}/Month<span>USD</span>
                          </p>
                        </div>
                        <div className="card-pricing-center">
                          {/* {item?.plan_points.length > 0 && ( */}
                            <ul>
                              {JSON.parse(item?.plan_points).map(
                                (item, i) => {
                                  return <li key={i}>{item}</li>;
                                }
                              )}
                              {/* <li>Unlimited Book</li>
                              <li>Unlimited Clients/Brands</li>
                              <li>Up to 5 Users</li> */}
                            </ul>
                          {/* )} */}
                          <p>
                            For teams who add less than 100 clips/month* across
                            their brands or clients
                          </p>
                        </div>
                      </div>
                      <div className="card-pricing-button">
                        <button
                          disabled={userCurrentPackage === item.plan_id}
                          style={{
                            backgroundColor:
                              userCurrentPackage === item.plan_id && "#9d9ea2",
                          }}
                          className="btn-reg btn-package no-delay mt-0"
                          onClick={() => {
                            setIsBuyModalOpen(true);
                            setSelectedPackage(item);
                          }}
                        >
                          {userCurrentPackage === item.plan_id
                            ? "Subscribed Plan"
                            : "Buy"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                // <div className="col-lg-3 col-md-6" key={i}>
                //   <span className="card pricing-card">
                //     <div className="body text-center">
                //       <h3 className="mt-3">{item.package_name}</h3>
                //       <p className="d-flex align-items-center justify-content-center">
                //         {" "}
                //         <i className="fa fa-tag font-22 mr-2" />
                //         {item.price}
                //       </p>
                //     </div>
                //     <div className="card-footer text-center">
                //       <div className="row clearfix">
                //         <div className="col-12">
                //           <button className="btn btn-success btn-sm d-flex align-items-center justify-content-center btn-block">
                //             {/* <i className="fa fa-edit font-22" /> */}
                //             <span>Buy</span>
                //           </button>
                //         </div>
                //       </div>
                //     </div>
                //   </span>
                // </div>
              );
            })}
          </div>
        </section>
      </main>
      {isBuyModalOpen && (
        <Elements stripe={stripePromise}>
          <BuyPackageModal
            isShowModal={isBuyModalOpen}
            setIsShowModal={setIsBuyModalOpen}
            data={selectedPackage}
          />
        </Elements>
      )}
    </>
  );
};

const mapStateToProps = ({ SubscriptionReducer, UserReducer }) => {
  return {
    SubscriptionReducer,
    UserReducer,
  };
};

export default connect(mapStateToProps, actions)(PackagesPricingScreen);
