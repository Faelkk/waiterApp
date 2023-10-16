import { Modal } from "react-native";
import { Container, OkButton } from "./Style";
import { Text } from "../../utils/Text";
import { CheckCircle } from "../Icons/CheckCircle";

interface orderConfirmedModalProps {
    visible: boolean;
    onOk: () => void;
}

export default function OrderConfirmedModal({
    visible,
    onOk,
}: orderConfirmedModalProps) {
    return (
        <Modal visible={visible} animationType="fade">
            <Container>
                <CheckCircle />

                <Text
                    size={20}
                    weight="600"
                    color="#fff"
                    style={{ marginTop: 12 }}
                >
                    Pedido confirmado
                </Text>

                <Text color="#fff" opacity={0.9} style={{ marginTop: 4 }}>
                    o pedido ja entrou na fila de produção
                </Text>

                <OkButton onPress={onOk}>
                    <Text color="#d73035" weight="600">
                        OK
                    </Text>
                </OkButton>
            </Container>
        </Modal>
    );
}
