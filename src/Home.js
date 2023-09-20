import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
    // declare the state variable
    const [maleName, setMaleName] = useState("");
    const [maleDob, setMaleDob] = useState("");
    const [femaleName, setFemaleName] = useState("");
    const [femaleDob, setFemaleDob] = useState("");
    const [result, setResult] = useState("");
    const [articles, setArticles] = useState([]); 
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // method to handle form submit event
    const handleSubmit = async (event) => {
        // prevent default behaviour
        event.preventDefault();

        // validate form
        if (!validateForm()) {
            return;
        }

        // try catch block to handle exceptions
        try {
            // call the api endpoint
            const response = await axios.post(process.env.REACT_APP_CALCULATOR_SERVER, {
                male: {
                    name: maleName,
                    dob: maleDob
                },
                female: {
                    name: femaleName,
                    dob: femaleDob
                }
            });

            // call the article search method
            if (response.data.success === 1) {
                if (response.data.data.love <= response.data.data.sex && response.data.data.love <= response.data.data.communication) {
                    console.log(`Love Score: ${response.data.data.love}`);
                    handleArticleSearch("Love");
                    setMessage("LOVE")
                } else if (response.data.data.sex <= response.data.data.love && response.data.data.sex <= response.data.data.communication) {
                    console.log(`Sex Score: ${response.data.data.sex}`)
                    handleArticleSearch("Sex");
                    setMessage("SEX")
                } else {
                    console.log(`Overall Score: ${response.data.data.overall}`);
                    handleArticleSearch("Happiness");
                    setMessage("COMMUNICATION")
                }
            } else {
                // set the error in state
                console.log(error);
                setError("An error occured!");
            }

            // set the result in state
            console.log(response.data);
            setResult(response.data.data);
        } catch (error) {
            // log the error
            console.error(error);

            // set the error in state
            setError(error.message);
        }
    }

    // validate form 
    const validateForm = () => {
        // check if form is invalid
        if (
            maleName.trim() === "" ||
            maleDob.trim() === "" ||
            femaleName.trim() === "" ||
            femaleDob.trim() === ""
        ) {
            // reset form
            setMaleName("");
            setMaleDob("");
            setFemaleName("");
            setFemaleDob("");

            // set error
            setError("Please fill all the fields!");

            // return false
            return false;
        } else {
            // set error
            setError("");

            // return true
            return true;
        }
    }

    // method to handle search event
    const handleArticleSearch = async (keywords) => {
        // try catch block to handle exceptions
        try {
            // call the api endpoint
            const response = await axios.get(process.env.REACT_APP_ARTICLE_SERVER, {
                params: {
                    keywords: keywords
                }
            });

            // check if response is success
            if (response.data) {
                // set the article in state
                console.log(response.data.data);
                setArticles(response.data.data);
            } else {
                // set the article in state
                setArticles([]);
                setError("No articles found!");
            }
        } catch (error) {
            // error handling
            console.error(error);
            setError("An error occured!");
        }
    }

    // navigate to terms and conditions page
    const handleTerms = () => {
        // navigate to terms and conditions page
        navigate("/terms");
    }

    return (
        <div className="container">
            <div className="row mx-3 d-flex flex-column justify-content-center align-items-center">
                <div className="col-md-4">
                    <div className="d-flex align-items-center justify-content-around w-100 dark-bg border border-dark rounded-3">
                        <h1>&#128151;</h1>
                        <h1 className="fs-3 py-2 header-color">LOVE CALCULATOR</h1>
                        <h1>&#128151;</h1>
                    </div>
                    <div className="d-flex flex-column border border-secondary rounded-3 main w-100">
                        <form className="row px-5 pt-5 pb-3" onSubmit={ handleSubmit }>
                            <div className="col-md-12 d-flex flex-column">
                                <label htmlFor="maleName" className="label-width text-light">His Name:</label>
                                <input 
                                    type="text" 
                                    className="form-control border border-dark rounded-3 mb-2" 
                                    id="maleName" 
                                    placeholder="Enter his name..." 
                                    value={ maleName.toUpperCase() } 
                                    onChange={ (event) => setMaleName(event.target.value) } 
                                />
                                <label htmlFor="maleDob" className="label-width text-light label-size">His Birthday:</label>
                                <input 
                                    type="date" 
                                    className="form-control border border-dark rounded-3 mb-4" 
                                    id="maleDob" 
                                    placeholder="Enter his birthday..." 
                                    value={ maleDob } 
                                    onChange={ (event) => setMaleDob(event.target.value) } 
                                    max="2010-12-31"
                                    min="1900-01-01"
                                />
                                <label htmlFor="femaleName" className="label-width text-light">Her Name:</label>
                                <input 
                                    type="text" 
                                    className="form-control border border-dark rounded-3 mb-2" 
                                    id="femaleName" 
                                    placeholder="Enter her name..." 
                                    value={ femaleName.toUpperCase() } 
                                    onChange={ (event) => setFemaleName(event.target.value) } 
                                />
                                <label htmlFor="femaleDob" className="label-width text-light label-size">Her Birthday:</label>
                                <input 
                                    type="date" 
                                    className="form-control border border-dark rounded-3" 
                                    id="femaleDob"
                                    placeholder="Enter her birthday..." 
                                    value={ femaleDob } 
                                    onChange={ (event) => setFemaleDob(event.target.value) } 
                                    max="2010-12-31"
                                    min="1900-01-01"
                                />
                            </div>
                            <div className="d-flex justify-content-start">
                                <p className="text-danger fs-6 mt-2 mb-0">{ error }</p>
                            </div>
                            <div className="d-flex mt-3">
                                <button type="submit" className="btn btn-outline-info">CALCULATE</button>
                                <button type="button" className="btn btn-outline-secondary ms-3" onClick={ () => { 
                                    setMaleName(""); setMaleDob(""); setFemaleName(""); setFemaleDob(""); setResult(""); setError(""); 
                                } }>RESET</button>
                            </div>
                        </form>
                        <div className="row px-5 pb-5">
                            <div className="col-md-12">
                                <p className="header-color fs-4">Love Compatibility Score</p>
                                <div className="d-flex">
                                    <p className="text-secondary fs-3 label-width-score text-light">Overall: </p>
                                    <p className="text-info fs-3 mx-3">{ result.overall }</p>
                                </div>
                                <div className="d-flex">
                                    <p className="text-secondary fs-3 label-width-score text-light">Sex: </p>
                                    <p className="text-info fs-3 mx-3">{ result.sex }</p>
                                </div>
                                <div className="d-flex">
                                    <p className="text-secondary fs-3 label-width-score text-light">Love: </p>
                                    <p className="text-info fs-3 mx-3">{ result.love }</p>
                                </div>
                                <div className="d-flex">
                                    <p className="text-secondary fs-3 label-width-score text-light">Communication: </p>
                                    <p className="text-info fs-3 mx-3 font-weight-bold">{ result.communication }</p>
                                </div> 
                            </div>   
                        </div>
                    </div>
                    <div className="d-flex flex-column border border-secondary rounded-3 dark-bg w-100">
                        <div className="row px-5 pt-5 pb-3">
                            <p className="text-light">Search for articles related to improve your { message } score.</p>
                            <div className="d-flex justify-content-start table-responsive">
                                <table className="table table-dark table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Articles</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { articles.map((article, index) => {
                                            return (
                                                <tr key={ index }>
                                                    <td><a href={ article.url } target="_blank" className="text-info">{ article.title }</a></td>
                                                </tr>
                                            );
                                        }) }
                                    </tbody>
                                </table>
                                <p className="text-danger fs-6 mt-2 mb-0">{ error }</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-around w-100 dark-bg border border-dark rounded-3 m-0 py-2">
                        <h5 className="text-light fs-6">&copy;Love Calculator 2023</h5>
                        <h5 className="text-light fs-6"><button className="text-light button-dark" onClick={ handleTerms }>Terms & Conditions</button></h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

// export default Home;
export default Home;