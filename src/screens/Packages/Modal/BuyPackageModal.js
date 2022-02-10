import React, { useEffect, useState } from "react";
// Modal
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import * as actions from "../../../store/Actions/Index";

const BuyPackageModal = ({
  isShowModal,
  setIsShowModal,
  data,
  UserReducer,
  buy_subscription,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      // Show error to your customer (e.g., payment details incomplete)
      toast.error(error.message, {
        containerId: "modal-toast",
      });
    } else {
      buy_subscription(data.plan_id, UserReducer.user_id, {
        payment_token: paymentMethod.id,
        price_id: data.price_id,
        stripe_id: UserReducer.stripe_id,
      }).then(()=>setIsShowModal(false))
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  const _closeModal = () => {
    setIsShowModal(false);
  };
  return (
    <>
      <Modal
        isOpen={isShowModal}
        onRequestClose={_closeModal}
        contentLabel="Add Coverage Modal"
      >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          enableMultiContainer
          containerId="modal-toast"
        />

        <div className="modal all-modal parent-class-modal-6">
          <div className="modal-dialog" style={{ maxWidth: "600px" }}>
            <div className="modal-content" style={{ padding: "35px" }}>
              <div className="row">
                <div className="col-lg-12">
                  <h4 className="buy-pkage-hd">
                    Your selected Package:{" "}
                    <span className="font-weight-bold">
                      {data.plan_title.toUpperCase()}
                    </span>
                  </h4>
                </div>
                <div className="col-lg-12">
                  <form onSubmit={handleSubmit}>
                    <div
                      style={{
                        // backgroundColor: "skyblue",
                        padding: "30px 0px",
                      }}
                    >
                      <CardElement
                        hidePostalCode={true}
                        options={{
                          style: {
                            base: {
                              fontSize: "18px",
                              margin: "50px",
                              //   color: "#424770",
                              "::placeholder": {
                                color: "#aab7c4",
                              },
                            },
                            invalid: {
                              color: "#9e2146",
                            },
                          },
                        }}
                      />
                    </div>
                    <div style={{ backgroundColor: "red" }}>
                      <button
                        type="submit"
                        disabled={!stripe || !elements}
                        className="btn-reg btn-plan float-right"
                      >
                        Buy
                      </button>
                      <button
                        type="Button"
                        // disabled={!stripe}
                        onClick={() => _closeModal()}
                        className="btn-reg btn-plan float-right mr-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
const mapStateToProps = ({ UserReducer }) => {
  return { UserReducer };
};
export default connect(mapStateToProps, actions)(BuyPackageModal);
