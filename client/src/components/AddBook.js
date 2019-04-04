import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

class AddBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            genre: "",
            authorId: ""
        }
    }

    displayAuthors() {
        let data = this.props.getAuthorsQuery
        if (data.loading) {
            return (<option disabled>Loadin Authors...</option>)
        }
        else {
            return data.authors.map(author => {
                return (
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
            })
        }
    }
    submitForm(e) {
        e.preventDefault()
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        })

    }
    render() {
        return (
            <form onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label htmlFor="">Book name:</label>
                    <input onChange={(e) => this.setState({ name: e.target.value })} type="text" className="text" />
                </div>

                <div className="field">
                    <label htmlFor="">Genre:</label>
                    <input onChange={(e) => this.setState({ genre: e.target.value })} type="text" className="text" />
                </div>
                <div className="field">
                    <label htmlFor="">Author:</label>
                    <select onChange={(e) => this.setState({ authorId: e.target.value })} name="" id="">
                        <option value="">Select Author</option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <button>Add</button>
            </form>
        )
    }
}
export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook) 