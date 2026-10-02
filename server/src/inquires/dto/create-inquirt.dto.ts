export class CreateInquirtDto {
    inquiry_type: 'Training Inquiry' | 'ICT Solutions Inquiry';
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;

    funding?: string;
    attendees?: string;
    course?: string;

    service_interest?: string;
    project_scale?: string;
    timeline?: string;
    budget?: string;
    project_desc?: string;
    tech_specs?: string;
}