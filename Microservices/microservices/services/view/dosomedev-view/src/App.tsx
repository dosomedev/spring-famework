import { useState } from "react"
import Product from "./Product";
import dsdLogo from "/dsd-logo-symbol-v1.svg";
import HttpMethod from "./HttpMethod";
import "./App.css"

function App() {
    const [values, setValues] = useState<{ [key: string]: string }>({
        greetings: "",
        products: "",
        orderStatus: "",
        paymentStatus: "",
        shippingStatus: "",
        actionLog: "",
    });

    const addActionLog = (data: string) => {
        setValues((prevValues) => ({
            ...prevValues,
            actionLog: prevValues.actionLog + data + "\n",
        }));
    };

    const addGreetingMessage = (message: string) => {
        setValues((prevValues) => ({
            ...prevValues,
            greetings: prevValues.greetings + message + "\n",
        }));
    };

    const setProductStatus = (products: string) => {
        setValues((prevValues) => ({
            ...prevValues,
            products,
        }));
    };

    const setOrderStatus = (message: string) => {
        setValues((prevValues) => ({
            ...prevValues,
            orderStatus: message,
        }));
    };

    const setPaymentStatus = (message: string) => {
        setValues((prevValues) => ({
            ...prevValues,
            paymentStatus: message,
        }));
    };

    const setShippingStatus = (message: string) => {
        setValues((prevValues) => ({
            ...prevValues,
            shippingStatus: message,
        }));
    };

    const getBaseUrl = () => {
        if (import.meta.env.MODE === "development") {
            return "http://localhost:8080";
        } else {
            return window.location.origin;
        }
    };

    const fetchApiString = async (method: HttpMethod, url: string, body?: BodyInit) => {
        let message: string = "";

        try {
            // Prepare.
            let init: RequestInit = {};
            if (method === HttpMethod.POST) {
                init = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body,
                };
            }

            // Query.
            const response = await fetch(getBaseUrl() + "/api" + url, init);

            // Set.
            message = await response.text();
        } catch (error) {
            console.error("Error fetching string from API. Message: " + error);
        }

        return message;
    };

    const fetchApiObjects = async (url: string) => {
        let objects: any = "";

        try {
            // Query.
            const response = await fetch(getBaseUrl() + "/api" + url);

            // Set.
            objects = await response.json();
        } catch (error) {
            console.error("Error fetching string from API. Message: " + error);
        }

        return objects;
    }

    const greetAllMicroservices = async () => {
        try {
            // Query.
            const catalogMessage: string = await fetchApiString(HttpMethod.GET, "/product/greeting");
            const orderMessage: string = await fetchApiString(HttpMethod.GET, "/order/greeting");
            const paymentMessage: string = await fetchApiString(HttpMethod.GET, "/payment/greeting");
            const shippingMessage: string = await fetchApiString(HttpMethod.GET, "/shipping/greeting");

            // Set.
            addGreetingMessage(catalogMessage);
            addGreetingMessage(orderMessage);
            addGreetingMessage(paymentMessage);
            addGreetingMessage(shippingMessage);
            addActionLog("Greet every microservice.");
        } catch (error) {
            console.error("Error fetching greetings: ", error);
        }
    };

    const fetchProducts = async () => {
        try {
            // Query.
            const products: Product[] = await fetchApiObjects("/product/all");

            // Set.
            const productString: string = products.map((product) => `${product.productName} (${product.quantity})`).join(", ");
            setProductStatus(productString);
            addActionLog("List all products.");
        } catch (error) {
            console.error("Error fetching products: ", error);
        }
    };

    const placeOrder = async () => {
        try {
            // Prepare.
            const products: string = JSON.stringify([
                {
                    "id": 1,
                    "productName": "Headphones",
                    "quantity": 4,
                    "price": 34.99
                },
                {
                    "id": 2,
                    "productName": "Smartwatch",
                    "quantity": 5,
                    "price": 149.99
                }
            ]);

            // Query.
            const response: string = await fetchApiString(HttpMethod.POST, "/order", products);
            
            // Set.
            setOrderStatus(response);
            addActionLog("Place order.");
        } catch (error) {
            console.error("Error placing order: ", error);
        }
    };

    const payOrder = async () => {
        try {
            // Prepare.
            const products: string = JSON.stringify([
                {
                    "id": 1,
                    "productName": "Headphones",
                    "quantity": 4,
                    "price": 34.99
                },
                {
                    "id": 2,
                    "productName": "Smartwatch",
                    "quantity": 5,
                    "price": 149.99
                }
            ]);

            // Query.
            const response: string = await fetchApiString(HttpMethod.POST, "/payment", products);

            // Set.
            setPaymentStatus(response);
            addActionLog("Pay order.");
        } catch (error) {
            console.error("Error paying products: ", error);
        }
    };

    const shipProducts = async () => {
        try {
            // Prepare.
            const products: string = JSON.stringify([
                {
                    "id": 1,
                    "productName": "Headphones",
                    "quantity": 4,
                    "price": 34.99
                },
                {
                    "id": 2,
                    "productName": "Smartwatch",
                    "quantity": 5,
                    "price": 149.99
                }
            ]);

            // Query.
            const response: string = await fetchApiString(HttpMethod.POST, "/shipping", products);

            // Set.
            setShippingStatus(response);
            addActionLog("Ship products.");
        } catch (error) {
            console.error("Error shipping products: ", error);
        }
    };

    return (
        <>
            <a href="https://dosomedev.com" target="_blank">
                <img src={dsdLogo} className="logo" alt="Do Some Dev logo" />
            </a>
            <h1>Do Dome Dev - Microservices Example</h1>

            <table>
                <thead>
                    <tr>
                        <th>Action</th>
                        <th className="full-width">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><button className="bg-green button-sizing" onClick={() => greetAllMicroservices()}>Greet</button></td>
                        <td><textarea className="big-textarea" value={values.greetings} readOnly/></td>
                    </tr>
                    <tr>
                        <td><button className="bg-blue button-sizing" onClick={() => fetchProducts()}>Products</button></td>
                        <td><textarea className="small-textarea" value={values.products} readOnly/></td>
                    </tr>
                    <tr>
                        <td><button className="bg-yellow button-sizing" onClick={() => placeOrder()}>Order</button></td>
                        <td><textarea className="small-textarea" value={values.orderStatus} readOnly/></td>
                    </tr>
                    <tr>
                        <td><button className="bg-red button-sizing" onClick={() => payOrder()}>Pay</button></td>
                        <td><textarea className="small-textarea" value={values.paymentStatus} readOnly/></td>
                    </tr>
                    <tr>
                        <td><button className="bg-violet button-sizing" onClick={() => shipProducts()}>Ship</button></td>
                        <td><textarea className="small-textarea" value={values.shippingStatus} readOnly/></td>
                    </tr>
                </tbody>
            </table>

            <div>
                <h4>Log</h4>
                <p><textarea className="big-textarea" value={values.actionLog} readOnly/></p>
            </div>

            <p className="docs">
                This Spring Microservice example corresponds <a href="https://www.youtube.com/@dosomedev" target="_blank">this video on YouTube</a>.
            </p>
        </>
    )
}

export default App
