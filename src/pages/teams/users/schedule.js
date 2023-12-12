import { Box } from "@mui/material"
import { useRouter } from "next/router"
import {Layout as DashboardLayout} from '../../../layouts/layout'
const Page = () => {
    const router = useRouter()
    return <Box>
               
            </Box>
}

Page.getLayout = (page) => {
    return <DashboardLayout>
      {page}
    </DashboardLayout>
}
  
export default Page;