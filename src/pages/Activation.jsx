import React, { useState } from "react";
import { EmailActivation } from "../components";
import AccountSetup from "../components/AccountSetup";
import { useSelector } from "react-redux";
import { Button, Card } from "@mui/material";

export default function Activation() {
  const [activeStep, setActiveStep] = useState(1);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const userData = useSelector((state) => state.user.user);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  return (
    <div className="mx-auto lg:max-w-[calc(1280px)]">
      <div className="sm:pt-7 sm:pb-7 sm:pr-8 sm:pl-8 lg:p-8 lg:pt-4">
        <div className=" grid  w-full mt-4 h-auto place-items-center">
          <div className="w-full py-4 px-8 grid grid-rows-12">
            <div className=" row-start-1 row-end-2">
              {/* <Stepper
                activeStep={activeStep}
                isLastStep={(value) => setIsLastStep(value)}
                isFirstStep={(value) => setIsFirstStep(value)}
              >
                <Step onClick={() => setActiveStep(0)}>1</Step>
                <Step onClick={() => setActiveStep(1)}>2</Step>
                <Step onClick={() => setActiveStep(2)}>3</Step>
              </Stepper> */}
            </div>
            <Card className="w-full row-start-2 row-end-12 ">
              {activeStep === 0 ? (
                <EmailActivation />
              ) : activeStep === 1 ? (
                <AccountSetup categoriesData={userData.categories} />
              ) : null}
            </Card>

            <div className="mt-16 max-h-12 flex justify-between row-start-12 row-end-13">
              <Button onClick={handlePrev} disabled={isFirstStep}>
                Prev
              </Button>
              <Button onClick={handleNext} disabled={isLastStep}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
