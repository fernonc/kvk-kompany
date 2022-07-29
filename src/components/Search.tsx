import { useState, useEffect, ChangeEvent } from "react";
import { Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import Map from "./Map";

export default function Search() {
  type Company = {
    name: string;
    city: string;
    zipCode: string;
    streetName: string;
    logo: string;
    id: string;
  };

  type CompanyDetails = {
    catchPhrase: string;
    website: string;
    phoneNumber: string;
    id: string;
  };

  const [value, setValue] = useState<string>("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [singleCompany, setSingleCompany] = useState<Company>();
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  //Fetch companies based on input
  useEffect(() => {
    if (value.length === 3) {
      setLoading(true);
      axios
        .get(
          `https://617c09aad842cf001711c200.mockapi.io/v1/companies?search=${value}`
        )
        .then((res) => setCompanies(res.data.data))
        .then(() => setLoading(false))
        .catch((err) => {
          setLoading(false);
          if (err.response.status === 500)
            setError("Er is iets misgegaan, probeer het later nog eens");
        });
    }
  }, [value]);

  //Filters result when company name is not equal to value
  const filteredCompany = companies.filter((company) => {
    if (company.name !== value) {
      return company.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    } else {
      return false;
    }
  });

  //Dropdown with given results
  const resultDropdown = () => {
    if (loading && !filteredCompany.length && !error) {
      return <div className="bg-white p-3">Een moment geduld aub...</div>;
    } else if (!loading && value.length >= 3 && filteredCompany.length) {
      return (
        <ul className="bg-white p-0">
          {filteredCompany.map((company) => (
            <li key={company.id} onClick={() => onSearch(company)}>
              {company.name}
            </li>
          ))}
        </ul>
      );
    } else if (value.length >= 3 && !singleCompany && !error) {
      return (
        <div className="bg-white p-3">Er zijn geen resultaten gevonden.</div>
      );
    } else {
      return;
    }
  };

  //Fetch detailed information
  const onSearch = (company: Company) => {
    setValue(company.name);
    setSingleCompany(company);
    setLoading(true);
    axios
      .get(
        `https://617c09aad842cf001711c200.mockapi.io/v1/companies/${company.id}/details`
      )
      .then((res) => setCompanyDetails(res.data.data[0]))
      .then(() => setLoading(false))
      .catch((err) => {
        setLoading(false);
        setError("Er ging iets met het ophalen van de details.");
      });
  };

  const noSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="searchBar">
        <Form className="d-flex" onSubmit={noSubmit}>
          <Form.Control
            type="search"
            placeholder="zoeken..."
            value={value}
            aria-label="Zoeken"
            onChange={onChange}
          />
        </Form>
        <div className="resultDropdown">{resultDropdown()}</div>
      </div>

      <div className="results bg-white p-4 mt-3 mb-3">
        {error ? <div className="alert alert-danger">{error}</div> : null}
        {companyDetails ? (
          <>
            <Row className="companyDetails justify-content-center">
              <Col xs={12} md={3} className="pt-xs-5">
                <div className="logo">
                  <img
                    src={`${singleCompany!.logo}`}
                    alt={singleCompany!.name}
                  />
                </div>
              </Col>
              <Col xs={12} md={8}>
                <div className="name mb-2">{singleCompany!.name}</div>
                <Row>
                  <Col md={6}>
                    <ul>
                      <li>
                        <span className="bold">Street:</span>{" "}
                        {singleCompany!.streetName}
                      </li>
                      <li>
                        <span className="bold">City:</span>{" "}
                        {singleCompany!.city}
                      </li>
                      <li>
                        <span className="bold">Zipcode:</span>{" "}
                        {singleCompany!.zipCode}
                      </li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <ul>
                      <li>{companyDetails!.catchPhrase}</li>
                      <li>
                        <span className="bold">Website:</span>{" "}
                        <a
                          href={`${companyDetails!.website}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {companyDetails!.website}
                        </a>
                      </li>
                      <li>
                        <span className="bold">Phone:</span>{" "}
                        <a href={`tel:${companyDetails!.phoneNumber}`}>
                          {companyDetails!.phoneNumber}
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="pt-4">
              <Map />
            </Row>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            Maak hierboven gebruik van de zoekbalk om informatie uit het
            handelsregister op te vragen.
          </div>
        )}
      </div>
    </>
  );
}
