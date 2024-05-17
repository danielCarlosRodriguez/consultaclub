import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ClientForm = () => {
  const [option, setOption] = useState("document");
  const [inputValue, setInputValue] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = `https://gduapimd.herokuapp.com/existsClientSalonDelVino/${option}/${inputValue}`;
    try {
      const response = await axios.get(url);
      const { existe, email, marca } = response.data;
      if (existe) {
        if (marca) {
          setAlert({
            show: true,
            type: "success",
            message: `Usuario registrado en el Club.\nNivel de usuario: <strong>${marca}</strong>`,
          });
        } else {
          const message =
            option === "document"
              ? `Usuario no registrado en el Club.\nEl e-mail principal asociado a la cédula es <strong>${email}</strong>`
              : "Usuario no registrado en el Club.";
          setAlert({
            show: true,
            type: "warning",
            message,
          });
        }
      } else {
        setAlert({
          show: true,
          type: "danger",
          message: "Cliente no encontrado.",
        });
      }
    } catch (error) {
      setAlert({
        show: true,
        type: "danger",
        message: `Error: ${
          error.response
            ? error.response.data
            : "No se pudo conectar con el servidor"
        }`,
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-100" style={{ maxWidth: "40%" }}>
        <div className="card shadow p-4">
          <form onSubmit={handleSubmit}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="option"
                id="document"
                value="document"
                checked={option === "document"}
                onChange={() => setOption("document")}
              />
              <label className="form-check-label" htmlFor="document">
                Cédula de identidad
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="option"
                id="email"
                value="email"
                checked={option === "email"}
                onChange={() => setOption("email")}
              />
              <label className="form-check-label" htmlFor="email">
                e-mail
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="inputValue" className="form-label">
                Valor
              </label>
              <input
                type="text"
                className="form-control"
                id="inputValue"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Enviar
            </button>
          </form>
          {alert.show && (
            <div
              className={`alert alert-${alert.type} mt-3 text-center`}
              role="alert"
              style={{ whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{ __html: alert.message }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientForm;
