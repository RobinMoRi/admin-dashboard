import { Routes, Route } from 'react-router-dom'
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard/index';
import { UserContext } from './userContext' 
// import Team from './scenes/team/index';
// import Invoices from './scenes/invoices/index';
// import Contacts from './scenes/contacts/index';
// import Bar from './scenes/bar/index';
// import Form from './scenes/form/index';
// import Line from './scenes/line/index';
// import Pie from './scenes/pie/index';
// import FAQ from './scenes/faq/index';
// import Geography from './scenes/geography/index';
// import Calendar from './scenes/calendar/index';


function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <UserContext.Provider>
          <CssBaseline />
            <div className="app">
              <Sidebar />
              <main className="content">
                <Topbar />
                <Routes>
                  <Route path="/" element={<Dashboard/>}/>
                  {/* <Route path="/team" element={<Team/>}/>
                  <Route path="/invoices" element={<Invoices/>}/>
                  <Route path="/contacts" element={<Contacts/>}/>
                  <Route path="/bar" element={<Bar/>}/>
                  <Route path="/form" element={<Form/>}/>
                  <Route path="/line" element={<Line/>}/>
                  <Route path="/pie" element={<Pie/>}/>
                  <Route path="/faq" element={<FAQ/>}/>
                  <Route path="/geography" element={<Geography/>}/>
                  <Route path="/calendar" element={<calendar/>} /> */}
                </Routes>
              </main>
            </div>
          </UserContext.Provider>
        </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;