import Welcome from "./welcome";
import Code from "./code";

export default function Tenary() {
    const display = false;

    return display ? < Welcome/> : < Code />
}