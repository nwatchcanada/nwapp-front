import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import ReactModal from 'react-modal';

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../flashMessageComponent";
import { BUSINESS_TYPE_OF } from "../../../../constants/api";
import { UserTypeOfIconHelper } from "../../../../constants/helper";


export default class AdminAreaCoordinatorLiteRetrieveComponent extends Component {
    render() {
        const { slug, flashMessage, areaCoordinator, isLoading, onShowModalClick, onCloseModalClick, showModal, } = this.props;

        // Apply our styling for our modal component.
        const customStyles = {
            content : {
                top                   : '50%',
                left                  : '50%',
                right                 : '25%',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)'
            }
        };

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/area-coordinators`}><i className="fas fa-horse-head"></i>&nbsp;Area Coordinators</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <UserTypeOfIconHelper typeOfId={areaCoordinator && areaCoordinator.typeOf} />&nbsp;{areaCoordinator && areaCoordinator.fullName}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><UserTypeOfIconHelper typeOfId={areaCoordinator && areaCoordinator.typeOf} />&nbsp;{areaCoordinator && areaCoordinator.fullName}</h1>

                {areaCoordinator.state === 'inactive' &&
                    <div className="alert alert-info" role="alert">
                        <strong><i className="fas fa-archive"></i>&nbsp;Archived</strong> - This areaCoordinator is archived and is read-only.
                    </div>
                }

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </strong>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/admin/area-coordinator/${slug}/full`}>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to={`/admin/area-coordinator/${slug}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to={`/admin/area-coordinator/${slug}/files`}>
                                <span className="num"><i className="fas fa-cloud"></i>&nbsp;</span><span className="">Files</span>
                            </Link>
                        </div>
                        {/*
                        <div id="step-6" className="st-grey">
                            <Link to={`/admin/area-coordinator/${slug}/community/score-points`}>
                                <span className="num"><i className="fas fa-smile"></i>&nbsp;</span><span className="">Community</span>
                            </Link>
                        </div>
                        */}
                        <div id="step-7" className="st-grey">
                            <Link to={`/admin/area-coordinator/${slug}/operations`}>
                                <span className="num"><i className="fas fa-ellipsis-h"></i>&nbsp;</span><span className="">Operations</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row mt-0 pt-3 mb-4 pb-2">
                    <div className="col-md-9 mx-auto rounded bg-light border p-2">
                        <div className="row">
                            <div className="col-sm-4">
                                <Link to={`/admin/area-coordinator/${slug}/avatar`}>
                                    {areaCoordinator && areaCoordinator.avatarUrl !== undefined && areaCoordinator.avatarUrl !== null
                                        ? <img src={areaCoordinator.avatarUrl} className="img-fluid rounded" alt="Profile" id={`areaCoordinator-avatar-${slug}`} />
                                        : <img src="/img/placeholder.png" className="img-fluid rounded" alt="Profile" id={`avatar-placeholder`}/>
                                    }
                                    <p><i className="fas fa-edit"></i>Click here to change photo</p>
                                </Link>
                            </div>

                            <div className="col-sm-8 px-4 py-3">
                                {areaCoordinator && areaCoordinator.organizationName && areaCoordinator.typeOf === BUSINESS_TYPE_OF &&
                                    <h1>{areaCoordinator.organizationName}</h1>
                                }
                                <h3>
                                    {areaCoordinator && areaCoordinator.fullName}
                                </h3>

                                {areaCoordinator && areaCoordinator.address &&
                                    <p className="text-muted">
                                        {areaCoordinator.position
                                            ? <Link onClick={ (event)=>{ onShowModalClick(event) } }>
                                                <i className="fas fa-map-marker-alt"></i>&nbsp;{areaCoordinator && areaCoordinator.address}
                                            </Link>
                                            : <span>
                                                <i className="fas fa-map-marker-alt"></i>&nbsp;{areaCoordinator && areaCoordinator.address}
                                            </span>
                                        }
                                    </p>
                                }

                                {areaCoordinator && areaCoordinator.email &&
                                    <p>
                                        <a href={`mailto:${areaCoordinator.email}`}><i className="fas fa-envelope"></i>&nbsp;{areaCoordinator.email}</a>
                                    </p>
                                }

                                {areaCoordinator && areaCoordinator.primaryPhoneNational &&
                                    <p>
                                        <a href={`tel:${areaCoordinator.primaryPhoneE164}`}>
                                            <i className="fas fa-phone-square"></i>&nbsp;{areaCoordinator.primaryPhoneNational}
                                        </a>
                                    </p>
                                }
                                <p className="m-0"><strong>Tags:</strong></p>
                                {areaCoordinator &&
                                    <p>
                                        {areaCoordinator.tags && areaCoordinator.tags.map(
                                            (tag) => <TagItem tag={tag} key={tag.id} />)
                                        }
                                    </p>
                                }
                            </div>

                        </div>
                    </div>
                    {/*
					<div className="col-sm-12 mx-auto text-center mt-4">
						{areaCoordinator.state === 'inactive'
                            ? <button className="btn btn-orange btn-lg">
                                <i className="fas fa-lock"></i>&nbsp;Add Job
                              </button>
                            : <Link className="btn btn-success btn-lg" onClick={onClientClick}>
                                <i className="fas fa-plus"></i>&nbsp;Add Job
                              </Link>
                        }
					</div>
                    */}
                </div>

                <ReactModal
                   isOpen={showModal}
                    style={customStyles}
             contentLabel="Minimal Modal Example"
           onRequestClose={onCloseModalClick}>
                   <div>

                        <h1>
                            <i className="fas fa-map"></i>&nbsp;Map View&nbsp;-&nbsp;{areaCoordinator.address}&nbsp;
                           <button type="button" className="btn btn-secondary btn-lg float-right" onClick={onCloseModalClick}>
                               <span className="fa fa-times"></span>
                           </button>
                        </h1>

                        <div className="row">
                            <div className="col-md-12 mx-auto mt-2">

                                <form className="needs-validation" noValidate>
                                   <LeafletMap
                                       center={areaCoordinator.position}
                                       zoom={18}
                                       maxZoom={19}
                                       attributionControl={ isLoading === false}
                                       zoomControl={ isLoading === false }
                                       doubleClickZoom={ isLoading === false }
                                       scrollWheelZoom={ isLoading === false }
                                       dragging={ isLoading === false }
                                       animate={ isLoading === false }
                                       easeLinearity={0.35}
                                   >
                                       <TileLayer
                                           url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                                           attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                       />

                                       <Marker position={areaCoordinator.position} >
                                           <Popup>
                                               {areaCoordinator.address}
                                           </Popup>
                                       </Marker>

                                   </LeafletMap>

                               </form>
                           </div>
                       </div>
                   </div>
                </ReactModal>

            </div>
        );
    }
}


class TagItem extends Component {
    render() {
        const { id, text } = this.props.tag;
        return (
            <span className="badge badge-info badge-lg" value={id}>{text}</span>
        );
    };
}
