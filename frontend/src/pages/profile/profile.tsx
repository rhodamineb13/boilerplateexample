import { JSX } from "react";
import './profile.scss';
import profile from '../../assets/default-profile-placeholder-mfby2k0rliz1szsn.png'

const size : number = 150

export function ProfilePage() : JSX.Element {
    return (
        <>
            <div className="employee-profile">
                <div className="employee-profile-description" style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
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
                    <h2>A VERY LONG NAME</h2>
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
            </div>
        </>
    )
}