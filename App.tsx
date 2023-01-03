import Home from "./src/ui/screens/Home/Home";
import { NativeBaseProvider, Box } from "native-base";
import "moment/locale/fr";

export default function App() {
  return (
    <NativeBaseProvider>
      <Home />
    </NativeBaseProvider>
  );
}
