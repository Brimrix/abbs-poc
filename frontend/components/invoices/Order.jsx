import { Table as AntDTable, Typography, InputNumber, Popover } from "antd";
import Editable from "@/components/invoices/Editable.jsx";
import ImageSelector from "@/components/invoices/ImageSelector";
import { MinusCircleOutlined } from '@ant-design/icons';

function Order({ objectId, rows, onRowAdd, onRowSave, onRowEdit, onRowDelete }) {

  const columns = [
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      width: "2%",
      align: "center",
      render(_, row) {
        return <Popover
          placement="top"
          content="Remove Row"
        >
          <MinusCircleOutlined
            className="text-red-500"
            onClick={() => onRowDelete(row.uniqueId, objectId)} />
        </Popover>
      }
    },
    {
      title: "Sr#",
      width: "3%",
      align: "center",
      render: (_, record, index) => {
        return index + 1;
      }
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      width: "30%",
      align: "start",
      editable: true,
    },
    {
      title: "Image",
      dataIndex: "upload",
      key: "upload",
      align: "center",
      width: "10%",
      render(text, row) {
        return <ImageSelector
          id={row.id}
          renderSource={row.image_src}
          objectId={objectId}
          record={row}
        />
      }
    },
    {
      title: "Height",
      dataIndex: "height",
      key: "height",
      align: "center",
      editable: true,
    },
    {
      title: "Width",
      dataIndex: "width",
      key: "width",
      align: "center",
      editable: true,
    },
    {
      title: "Area (Sq.ft)",
      dataIndex: "area",
      key: "area",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "unit_price",
      align: "center",
      render: (text, row) => <InputNumber
        value={row.unit_price}
        onInput={(value) => onRowEdit(row, { unit_price: value }, 'setPrice')}
        min={1}
        variant="filled" precision={2} />
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      render: (text, row) => <InputNumber
        value={text}
        onInput={(value) => onRowEdit(row, { quantity: value }, 'setQuantity')}
        min={1}
        max={1000}
        variant="filled" precision={0} />
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "center",
    },
  ];

  const components = {
    body: {
      cell: Editable,
    },
  };

  const columnsConfig = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: onRowSave,
      }),
    };
  });

  return (
    <>
      <div className="flex flex-col">
        <AntDTable
          components={components}
          style={{ marginLeft: "40px" }}
          dataSource={rows}
          columns={columnsConfig}
          size="small"
          rowClassName={() => "editable-row"}
          pagination={false}
        />
        <Typography.Text
          onClick={() => onRowAdd(objectId)}
          className="text-primary cursor-pointer ml-32 px-2 p-px m-px hover:bg-primary hover:text-white max-w-max rounded-md"
          strong
        >
          Add More Rows
        </Typography.Text>
      </div>
    </>

  );
}

export default Order;
