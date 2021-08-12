import { CardContainer } from './styles';

// Represents one task.
export const Card = ({ text }: CardProps) => {
  return (
    <CardContainer>{text}</CardContainer>
  );
}

type CardProps = {
  text: string;
  id: string;
}
