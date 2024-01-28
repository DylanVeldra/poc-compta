interface StepMiniProps {
    currentStep: number;
}
const StepMini = ({ currentStep }: StepMiniProps) => {
  return (
    <>
    <div className="hidden md:flex absolute items-center" style={{ top: "-24px"}}>
        <div className={`${currentStep === 1 ? "bg-gold" : "dark:bg-dark-gray bg-light-gray"} rounded-sm`} style={{ width: currentStep === 1 ? "17px" : "8px", height: "8px", marginRight: "9px"}}></div>
        <div className={`${currentStep === 2 ? "bg-gold" : "dark:bg-dark-gray bg-light-gray"} rounded-sm`} style={{ width: currentStep === 2 ? "17px" : "8px", height: "8px", marginRight: "9px"}}></div>
        <div className={`${currentStep === 3 ? "bg-gold" : "dark:bg-dark-gray bg-light-gray"} rounded-sm`} style={{ width: currentStep === 3 ? "17px" : "8px", height: "8px"}}></div>
    </div>
    <div className="md:hidden flex absolute items-center w-full" style={{ top: "-31px"}}>
        <div className={`w-1/3 ${currentStep === 1 ? "bg-gold" : "dark:bg-dark-gray bg-light-gray"} rounded-sm`} style={{ height: "8px", marginRight: "9px"}}></div>
        <div className={`w-1/3 ${currentStep === 2 ? "bg-gold" : "dark:bg-dark-gray bg-light-gray"} rounded-sm`} style={{ height: "8px", marginRight: "9px"}}></div>
        <div className={`w-1/3 ${currentStep === 3 ? "bg-gold" : "dark:bg-dark-gray bg-light-gray"} rounded-sm`} style={{ height: "8px"}}></div>
    </div>
    </>
  )
}

export default StepMini