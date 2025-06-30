import React, { JSX, useEffect, useState } from "react";
import './profile.scss';
import profile from '../../assets/default-profile-placeholder-mfby2k0rliz1szsn.png'
import { Button, Form, Tab, Tabs } from "react-bootstrap";
import OwlCarousel from 'react-owl-carousel';
import lock from "../../assets/password.png"
import { ChangePassword } from "../../api/change_password";

const size : number = 150

const options = {
  items: 3,
  loop: true,
  autoplay: true,           // 🔥 required to enable auto play
  autoplayTimeout: 3000,    // 🔥 5 seconds between slides
  autoplaySpeed: 500,       // slide transition animation speed
  margin: 15,
  nav: false,
  dots: false,
};

export function ProfilePage() : JSX.Element {
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isPasswordSame, setIsPasswordSame] = useState<boolean>(false);

    const handleSubmit = () => {
        ChangePassword().then(() => window.location.reload()).catch((err) => alert(err))
    }

    useEffect(() => {
        setIsPasswordSame(newPassword === confirmPassword);
    }, [newPassword, confirmPassword]);

    const handleChangeCurrentPassword = (e : React.ChangeEvent<HTMLFormElement>) => {
        setCurrentPassword(e.target.value)
    }

    const handleChangeNewPassword = (e : React.ChangeEvent<HTMLFormElement>) => {
        setNewPassword(e.target.value)
    }

    const handleFocus = () => {
        setIsPasswordSame(newPassword === confirmPassword);
    }

    const handleChangeConfirmPassword = async (e : React.ChangeEvent<HTMLFormElement>) => {
        setConfirmPassword(e.target.value)
    }

    
    return (
        <div className="employee-profile-page" style={{width: '100%', display: 'flex', flexDirection: 'row', gap: '3%', justifyContent: 'space-between'}}>
            <div className="employee-profile" style={{width: '25%'}}>
                <div className="employee-profile-description" style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                        <svg
                            width={size}
                            height={size}
                            viewBox={`0 0 ${size} ${size}`}
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                            <clipPath id="avatar-circle-clip">
                                <circle cx={size / 2} cy={size / 2} r={size / 2} />
                            </clipPath>
                            </defs>
                            <image
                            href={profile}
                            width={size}
                            height={size}
                            clipPath="url(#avatar-circle-clip)"
                            preserveAspectRatio="xMidYMid slice"
                            />
                        </svg>
                    </div>
                    <h3>A VERY LONG NAME</h3>
                    <p>verylongusername</p>
                    <h4>Role</h4>
                    
                </div>
                <div className="employee-personal-info">
                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{marginLeft: '10px'}}>
                                <i className="fa-solid fa-home"></i> <span>Home</span>
                            </div>
                            <div style={{marginRight: '10px'}}>
                                <p>Jl. Jalan no. 1</p>
                            </div>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div style={{marginLeft: '10px'}}>
                                <i className="fa-solid fa-calendar"></i> <span>Join Date</span>
                            </div>
                            <div style={{marginRight: '10px'}}>
                                <p>Jl. Jalan no. 1</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="profile-shortcut" style={{marginTop: '60px', border: '2px solid #002f5f'}}>
                    <div className="profile-shortcut-header" style={{textAlign: 'left', backgroundColor: '#002f5f'}}>
                        <h4><i className="fa-solid fa-link" style={{marginRight: '5px'}}></i>SHORTCUT</h4>
                    </div>
                    <Container
                    fluid
                    style={{
                        padding: "10px",
                        width: "60%",
                        display: "flex",
                        justifyContent: "center", // horizontal center
                        alignItems: "center",     // vertical center
                    }}
                    >
                    <div style={{ width: "100%" }}>
                        <Row style={{ color: "black", marginBottom: "10px" }}>
                            <Col style={{ marginRight: "10px", backgroundColor: "#f0f0f0" }}><i className="fa-solid fa-clipboard-list"></i><p>Halo</p></Col>
                            <Col style={{ backgroundColor: "#f0f0f0" }}>Apa kabar</Col>
                        </Row>
                        <Row style={{ color: "black", marginBottom: "10px" }}>
                            <Col style={{ marginRight: "10px", backgroundColor: "#f0f0f0" }}>Halo</Col>
                            <Col style={{ backgroundColor: "#f0f0f0" }}>Apa kabar</Col>
                        </Row>
                    </div>
                    </Container>
                </div> */}
            </div>
            <div className="employee-statistics-and-menus" style={{width: '72%'}}>
                <div className="employee-statistics-carousel" style={{display: 'flex', justifyContent: 'center'}}>
                    <OwlCarousel className="owl-theme" {...options}>
                        <div className="item"><h5 className="description">Total sick</h5><span className="number">1</span></div>
                        <div className="item"><h5 className="description">Total leave</h5><span className="number">2</span></div>
                        <div className="item"><h5 className="description">Total AWOL</h5><span className="number">0</span></div>
                        <div className="item"><h5 className="description">Remaining Quota</h5><span className="number">9</span></div>
                    </OwlCarousel>
                </div>
                <div className="employee-notifications-settings">
                    <Tabs>
                        <Tab eventKey="notifications" title={<span>Notifications</span>}> <span> Notifications </span> </Tab>
                        <Tab eventKey="settings" title={<span>Settings</span>}>
                            <div className="settings-menu">
                                <div className="settings-menu-change-password" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '25px'}}>
                                    <div className="settings-menu-change-password-form" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '350px'}}>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3" onChange={handleChangeCurrentPassword}>
                                                <Form.Label> Current Password </Form.Label>
                                                <Form.Control type="password"/>
                                            </Form.Group>
                                            <Form.Group className="mb-3" onChange={handleChangeNewPassword}>
                                                <Form.Label> New Password </Form.Label>
                                                <Form.Control type="password"/>
                                                {newPassword && newPassword.length <= 6 && <Form.Text style={{color: 'red'}}><i className="fa-solid fa-exclamation-triangle"></i> Password must be at least six characters long </Form.Text>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" onFocus={handleFocus} onChange={handleChangeConfirmPassword}>
                                                <Form.Label> Confirm Password </Form.Label>
                                                <Form.Control type="password"/>
                                                {newPassword && !isPasswordSame && <Form.Text style={{color: 'red'}}><i className="fa-solid fa-exclamation-triangle"></i> Password doesn't match </Form.Text>}
                                            </Form.Group>
                                            <Button type="submit" disabled={!newPassword || (newPassword !== confirmPassword)}><span>Submit</span></Button>
                                        </Form>
                                    </div>  
                                    <div className="settings-menu-change-password-icon">
                                        <img src={lock} width={300}/>
                                    </div>
                                </div>
                            </div>
                            
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}                    