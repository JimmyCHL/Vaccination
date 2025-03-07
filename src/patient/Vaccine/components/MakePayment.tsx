import { Schedule } from '../../../redux/Schedule/type'

type MakePaymentProps = {
  schedule: Partial<Schedule>
}

export const MakePayment = ({ schedule }: MakePaymentProps) => {
  return <div>MakePayment</div>
}
