import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES, CommonUtils } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { createNewClinic, editSpecialtyService } from '../../../services/userService';
import { toast } from 'react-toastify';
import { getAllSpecialty, deleteSpecialty } from '../../../services/userService';
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            dataClinic: [],
            specialtyEditId: '',
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : []
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

        if (prevProps.dataClinic !== this.props.dataClinic) {

        }

    }

    handleOnChangInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }

    handleOnChangImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,

            })

        }
    }

    handleSaveNewClinic = async () => {

        let res = await createNewClinic(this.state);
        if (res && res.errCode === 0) {
            toast.success('Add new clinic succeed!');
            this.setState(
                {
                    name: '',
                    imageBase64: '',
                    address: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                    dataClinic: this.state.dataClinic,
                }
            )
            window.location.reload();
        } else {
            toast.error('Somthing wrong....!');
        }

    }

    handleUpdateSpecialty = async () => {
        let res = await editSpecialtyService({
            id: this.state.specialtyEditId,
            name: this.state.name,
            imageBase64: this.state.imageBase64,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown,
        })

        if (res && res.errCode === 0) {
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                dataClinic: this.state.dataClinic,
            })
            toast.success('Update specialty succeed!');
        } else {
            toast.error('Somthing wrong....!');
        }

    }

    handleEditSpecialty = (specialty) => {
        // console.log('check specialty Id ', specialty.name);
        let imageBase64 = '';
        if (specialty.image) {
            imageBase64 = new Buffer(specialty.image, 'base64').toString('binary');
        }
        this.setState({
            name: specialty.name,
            imageBase64: imageBase64,
            descriptionHTML: specialty.descriptionHTML,
            descriptionMarkdown: specialty.descriptionMarkdown,
            specialtyEditId: specialty.id

        })

    }

    handleDeleteUser = async (specialty) => {
        let res = await deleteSpecialty(specialty.id);
        console.log('check ', specialty);
        if (res && res.errCode === 0) {
            toast.success('delete  specialty succeed!');
            window.location.reload();
        } else {
            toast.error('Somthing wrong....!');
        }
    }
    render() {
        let { dataClinic } = this.state;
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lý phòng khám</div>

                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên phòng khám</label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(event) => this.handleOnChangInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh phòng khám</label>
                        <input className='form-control-file' type='file'
                            onChange={(event) => this.handleOnChangImage(event)}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Địa chỉ phòng khám </label>
                        <input className='form-control' type='text' value={this.state.address}
                            onChange={(event) => this.handleOnChangInput(event, 'address')}
                        />
                    </div>
                    <div className='col-12'>
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12 btn-setting'>
                        <button className='btn-save-specialty'
                            onClick={() => this.handleSaveNewClinic()}
                        >Create</button>
                        <button className='btn-update-specialty'
                            onClick={() => this.handleUpdateSpecialty()}
                        >Update</button>
                    </div>

                    <div className='col-12'>
                        <table id='TableManageSpecialty'>
                            <tbody>
                                <tr>
                                    <th>Specialty name</th>
                                    <th>Actions</th>
                                </tr>
                                {dataClinic && dataClinic.length > 0 &&
                                    dataClinic.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>
                                                    <button
                                                        className="btn-edit"
                                                        onClick={() => this.handleEditSpecialty(item)}
                                                    ><i className="fas fa-pencil-alt"></i>
                                                    </button>
                                                    <button
                                                        className='btn-delete'
                                                        onClick={() => this.handleDeleteUser(item)}
                                                    > <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table >
                    </div>

                </div>
            </div>


        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
