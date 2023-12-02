import Authentication3 from "@/components/quest/Authentication3"
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import questTheme from '../../../themes/QuestUiKitLightTheme'

export default ({session, setSession}) => {
    return <StyledEngineProvider injectFirst>
                <ThemeProvider theme={questTheme}>
                    <Authentication3 session={session} setSession={setSession}/>
                </ThemeProvider>
            </StyledEngineProvider>
}
