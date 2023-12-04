import {Calendar} from '../../components/calendar'
import {Layout as DashboardLayout} from '../../layouts/layout'
const Page = () => {
    return <Calendar/>
}





Page.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
  
  export default Page;