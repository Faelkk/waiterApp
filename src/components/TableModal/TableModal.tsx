import { Modal, Platform, TouchableOpacity } from "react-native";
import { Text } from "../../utils/Text";
import { Form, Input, ModalBody, ModalHeader, Overlay } from "./style";
import { Close } from "../Icons/Close";
import Button from "../Button/Button";
import { useState } from "react";

interface tableModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (value: string) => void;
}

export default function TableModal({
    visible,
    onClose,
    onSave,
}: tableModalProps) {
    const [tableNumber, setTableNumber] = useState("");

    function handleSave() {
        setTableNumber("");
        onSave(tableNumber);
        onClose();
    }

    return (
        <Modal transparent visible={visible} animationType="fade">
            <Overlay
                behavior={Platform.OS === "android" ? "height" : "padding"}
            >
                <ModalBody>
                    <ModalHeader>
                        <Text weight="600">Informe a mesa</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Close color="#777" />
                        </TouchableOpacity>
                    </ModalHeader>
                    <Form>
                        <Input
                            placeholder="Numero da mesa"
                            placeholderTextColor="#666"
                            keyboardType="number-pad"
                            onChangeText={setTableNumber}
                        />
                        <Button
                            onPress={handleSave}
                            disabled={tableNumber.length === 0}
                        >
                            Salvar
                        </Button>
                    </Form>
                </ModalBody>
            </Overlay>
        </Modal>
    );
}
