import * as React from 'react';
import { Button } from './ui/button';

interface EmailTemplateProps {
    user: any;
    activeOrgName: string;
    dashboardLink: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    user,
    activeOrgName,
    dashboardLink,
}) => (
    <table style={{ width: '100%', backgroundColor: '#FFF', padding: '14px', paddingTop: "20px" }}>
        <tr>
            <td align="center">
                <img
                    src="https://ci3.googleusercontent.com/meips/ADKq_NbYrGuSpwWBBGXQZleMAy4pLNAQUPiiss7bygf9Kmt9RtMDbDkYlnDtxFx0riBgb9bDLFlrzyrR6YMO33CWX1eMX72H06iPfN5sy--cC4agpI4NfQsELH73avx2D5VaTTJGdjBxS0mdUzBfuPKudQjcNc0fTq0gbJufjnmhomOQUvXU0sYzXOL4b_IIdg2UFdRbio-qIXO8fCOkVCGX43SUDzvvqg=s0-d-e1-ft#https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJjRUZzenhmTlliVGpEdHRZNnR4TmEyaVMyVCJ9"
                    alt="Sketchlie Logo"
                    width={150}
                />
            </td>
        </tr>
        <tr>
            <td align="center">
                <div style={{ display: 'block', padding: '40px', backgroundColor: '#FFF', borderRadius: '10px', border: '1px solid black', width: '100%', maxWidth: '500px', marginTop: '20px', textAlign: 'center' }}>
                    <p style={{ fontSize: '1.5em', marginLeft: '4px' }}>{user.name} has invited you to join {activeOrgName}.</p>
                    <div style={{ display: 'block', textAlign: 'center', marginTop: '40px' }}>
                        <a href={dashboardLink} 
                            style={{
                                border: '1px solid #inputColor',
                                backgroundColor: '#2E4DE6',
                                color: '#fff',
                                padding: '15px',
                                borderRadius: '10px',
                                width: '100%',
                                cursor: 'pointer',
                            }}
                        >
                                Accept Invitation
                        </a>
                    </div>
                </div>
                <div style={{ display: 'block', paddingTop: '32px', width: '100%', maxWidth: '500px', textAlign: 'center', margin: 'auto' }}>
                    <p>
                        Email sent from {user.email}.
                    </p>
                    <p>
                        If you did not request this invitation, please ignore this email.
                    </p>
                </div>
            </td>
        </tr>
    </table>
);