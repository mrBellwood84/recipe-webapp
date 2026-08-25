import {Container} from "@mantine/core";
import {ForgotPasswordForm} from "@/components/auth/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <Container size={420} my={40}>
      <ForgotPasswordForm/>
    </Container>
  );
};

export default ForgotPasswordPage;