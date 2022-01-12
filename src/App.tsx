import { useState } from "react";
import LoginForm from "./Login/LoginForm";

function App() {
  const [count, setCount] = useState(0);

  function noop() {
    return;
  }

  return (
    <div>
      <h1 data-testid="app-div">React Testing with Jest example</h1>
      <LoginForm
        shouldRemember={true}
        onPasswordChange={noop}
        onRememberChange={noop}
        onSubmit={noop}
        onUsernameChange={noop}
      />
    </div>
  );
}

export default App;
