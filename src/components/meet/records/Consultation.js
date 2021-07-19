import React from "react";
import { Form, Input, Button, message, Popconfirm } from "antd";

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

export default function Consultation(props) {
  const [form] = Form.useForm();
  const [popconfirmVisible, setPopconfirm] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const showPopconfirm = () => {
    setPopconfirm(true);
  };

  const handleSubmit = (event) => {
    setConfirmLoading(true);
    message.success("Saved");
    // event.preventDefault();
    props.onRecordsSubmit(form.getFieldsValue(true));

    setTimeout(() => {
      setPopconfirm(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setPopconfirm(false);
  };

  return (
    <>
      <Form {...formItemLayout} form={form} name="consultation-create">
        <Form.Item
          name={["diagnosis"]}
          label="Diagnosis"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name={["medication"]}
          label="Medication"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item name={["notes"]} label="Notes" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
      </Form>
      <Popconfirm
        title="Are you sure?"
        visible={popconfirmVisible}
        onConfirm={handleSubmit}
        okButtonProps={{ loading: confirmLoading }}
        onCancel={handleCancel}
      >
        <Button onClick={showPopconfirm} htmlType="submit">
          Save and Submit
        </Button>
      </Popconfirm>
    </>
  );
}
