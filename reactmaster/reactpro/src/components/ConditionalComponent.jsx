import Code from "./code";
import Welcome from "./welcome";

export default function ConditionalComponent() {
  const display = false;
  if (display) {
    return (
      <div>
        <h3>
          <Code />
        </h3>
      </div>
    );
  } else {
    return (
      <div>
        <h3>
          <Welcome />
        </h3>
      </div>
    );
  }
}
