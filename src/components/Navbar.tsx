import { Container, Navbar as NavbarBs } from "react-bootstrap";

export default function Navbar() {
  return (
    <NavbarBs sticky="top" className="bg-white shadown-sm mb-3">
      <Container>
        <NavbarBs.Brand href="/">KOMPANY</NavbarBs.Brand>
      </Container>
    </NavbarBs>
  );
}
