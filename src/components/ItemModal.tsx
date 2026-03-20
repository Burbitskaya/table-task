import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, InputNumber } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { FormValues } from '../types';

interface ItemModalProps {
    visible: boolean;
    onCancel: () => void;
    onOk: (values: FormValues) => void;
    initialValues?: FormValues & { id?: string } | null;
    title: string;
}

interface FormData {
    name: string;
    date: Dayjs;
    value: number;
}

const ItemModal: React.FC<ItemModalProps> = ({
                                                 visible,
                                                 onCancel,
                                                 onOk,
                                                 initialValues,
                                                 title,
                                             }) => {
    const [form] = Form.useForm<FormData>();

    useEffect(() => {
        if (visible && initialValues) {
            form.setFieldsValue({
                name: initialValues.name,
                date: dayjs(initialValues.date, 'YYYY-MM-DD'),
                value: initialValues.value,
            });
        } else if (visible && !initialValues) {
            form.resetFields();
        }
        console.log(visible);
    }, [visible, initialValues, form]);

    const handleOk = () => {
        form
            .validateFields()
            .then(values => {
                const formattedValues: FormValues = {
                    name: values.name,
                    date: values.date.format('YYYY-MM-DD'),
                    value: values.value,
                };
                onOk(formattedValues);
                form.resetFields();
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Modal
            title={title}
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            destroyOnHidden
        >
            <Form form={form} layout="vertical" initialValues={{ name: '', value: undefined, date: null }}>
                <Form.Item
                    name="name"
                    label="Имя"
                    rules={[{ required: true, message: 'Введите имя' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="date"
                    label="Дата"
                    rules={[{ required: true, message: 'Выберите дату' }]}
                >
                    <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="value"
                    label="Значение"
                    rules={[
                        { required: true, message: 'Введите число' },
                        { type: 'number', min: 0, message: 'Значение должно быть положительным числом' },
                    ]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ItemModal;