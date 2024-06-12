import { useState, useEffect } from "react";
import { Typography, Card, Button, InputNumber } from "antd";
import { useBillContext } from "@/context/BillContext";

function CardComponent() {
  const { state } = useBillContext();

  const [totalArea, setTotalArea] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const [grandTotal, setGrandTotal] = useState(0);
  const [discountInput, setDiscountInput] = useState(0);

  const handleDiscountChange = (value) => {
    setDiscountInput(value);
  };

  useEffect(() => {
    const grandTotal = Math.round((subTotal - discountInput) * 100) / 100;
    setGrandTotal(grandTotal);
  }, [discountInput]);

  useEffect(() => {
    let area = state.billData.reduce((accumulator, element) => {
      if (element && typeof element.area !== "undefined") {
        return accumulator + element.area;
      } else {
        return accumulator + 0;
      }
    }, 0);

    let subTotal = state.billData.reduce((accumulator, element) => {
      if (element && typeof element.amount !== "undefined") {
        return accumulator + element.amount;
      } else {
        return accumulator + 0;
      }
    }, 0);

    if (discountInput !== 0) {
      const subTotalValue = subTotal - discountInput;
      setGrandTotal(subTotalValue);
    }

    subTotal = Math.round(subTotal * 100) / 100;
    area = Math.round(area * 100) / 100;
    const grandTotal = Math.round((subTotal - discountInput) * 100) / 100;

    setTotalArea(area);
    setSubTotal(subTotal);
    setGrandTotal(grandTotal);
  }, [state]);

  return (
    <Card
      className="bg shadow border w-[35%] p-3"
      style={{ backgroundColor: "#F6F6F6" }}
    >
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <Typography.Text strong className="text-sm">
            Sub Total
          </Typography.Text>
          <Typography.Text strong className="text-sm">
            Total Area
          </Typography.Text>
          <Typography.Text strong className="text-sm">
            Add Discount
          </Typography.Text>
          <Typography.Text strong className="text-sm text-primary">
            Grand Total
          </Typography.Text>
        </div>

        <div className="flex flex-col gap-3 items-center">
          <Typography.Text strong className="text-sm">
            {subTotal}
          </Typography.Text>
          <Typography.Text strong className="text-sm">
            {totalArea}
          </Typography.Text>
          <InputNumber onChange={handleDiscountChange} />
          <Typography.Text strong className="text-sm text-primary">
            {grandTotal}
          </Typography.Text>
        </div>
      </div>

      <div className="flex justify-around gap-3">
        <Button className="!btn-app-primary w-[50%] text-white hover:!border-none hover:!text-white">
          Print Slip
        </Button>
        <Button className="!btn-app-primary w-[50%] text-white hover:!border-none hover:!text-white">
          Save
        </Button>
      </div>
    </Card>
  );
}

export default CardComponent;
