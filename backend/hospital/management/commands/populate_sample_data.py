from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import datetime, timedelta
from hospital.models import Department, Doctor, DoctorSchedule, News

class Command(BaseCommand):
    help = 'Populate database with sample doctors and news'

    def handle(self, *args, **kwargs):
        self.stdout.write('Populating sample data...')

        # Create Departments if they don't exist
        ophthalmology, _ = Department.objects.get_or_create(
            name='Ophthalmology',
            defaults={
                'description': 'Comprehensive eye care services including diagnosis, treatment, and surgery for all eye conditions.',
                'is_active': True
            }
        )

        optometry, _ = Department.objects.get_or_create(
            name='Optometry',
            defaults={
                'description': 'Vision testing, prescription of corrective lenses, and detection of eye diseases.',
                'is_active': True
            }
        )

        retina, _ = Department.objects.get_or_create(
            name='Retina Services',
            defaults={
                'description': 'Specialized treatment for retinal conditions including diabetic retinopathy and macular degeneration.',
                'is_active': True
            }
        )

        # Create Sample Doctors
        doctors_data = [
            {
                'first_name': 'Naveen',
                'last_name': 'Gopal',
                'email': 'dr.naveen@gopalanethralaya.com',
                'phone': '+916362727509',
                'gender': 'M',
                'date_of_birth': '1975-05-15',
                'medical_license': 'KMC-45678',
                'specialization': 'Cataract & Refractive Surgery',
                'department': ophthalmology,
                'years_of_experience': 20,
                'qualifications': 'MBBS, MS (Ophthalmology), FRCS (Glasgow)\nFellowship in Phaco & Refractive Surgery',
                'bio': 'Dr. Naveen Gopal is a highly experienced ophthalmologist with over 20 years of expertise in cataract and refractive surgery. He has performed over 15,000 successful eye surgeries and is known for his precision and patient care.',
                'consultation_fee': 800.00,
                'consultation_duration': 30,
                'is_available': True,
                'is_active': True
            },
            {
                'first_name': 'Priya',
                'last_name': 'Sharma',
                'email': 'dr.priya@gopalanethralaya.com',
                'phone': '+918023488880',
                'gender': 'F',
                'date_of_birth': '1980-08-20',
                'medical_license': 'KMC-56789',
                'specialization': 'Retina Specialist',
                'department': retina,
                'years_of_experience': 15,
                'qualifications': 'MBBS, MS (Ophthalmology), FICO\nFellowship in Vitreo-Retinal Surgery',
                'bio': 'Dr. Priya Sharma specializes in medical and surgical retina, with extensive experience in treating diabetic retinopathy, retinal detachment, and macular disorders. She is dedicated to preserving and restoring vision through advanced retinal treatments.',
                'consultation_fee': 1000.00,
                'consultation_duration': 30,
                'is_available': True,
                'is_active': True
            },
            {
                'first_name': 'Rajesh',
                'last_name': 'Kumar',
                'email': 'dr.rajesh@gopalanethralaya.com',
                'phone': '+919876543210',
                'gender': 'M',
                'date_of_birth': '1978-03-10',
                'medical_license': 'KMC-67890',
                'specialization': 'LASIK & Cornea Specialist',
                'department': ophthalmology,
                'years_of_experience': 18,
                'qualifications': 'MBBS, MS (Ophthalmology), DNB\nFellowship in Cornea & Refractive Surgery',
                'bio': 'Dr. Rajesh Kumar is an expert in LASIK, corneal transplants, and refractive surgeries. He has helped thousands of patients achieve clear vision without glasses through advanced laser eye surgery techniques.',
                'consultation_fee': 900.00,
                'consultation_duration': 30,
                'is_available': True,
                'is_active': True
            },
            {
                'first_name': 'Anita',
                'last_name': 'Desai',
                'email': 'dr.anita@gopalanethralaya.com',
                'phone': '+919988776655',
                'gender': 'F',
                'date_of_birth': '1985-11-25',
                'medical_license': 'KMC-78901',
                'specialization': 'Pediatric Ophthalmology',
                'department': ophthalmology,
                'years_of_experience': 12,
                'qualifications': 'MBBS, MS (Ophthalmology)\nFellowship in Pediatric Ophthalmology',
                'bio': 'Dr. Anita Desai specializes in children\'s eye care, including treatment of amblyopia, strabismus, and congenital eye disorders. She is known for her gentle approach with young patients.',
                'consultation_fee': 700.00,
                'consultation_duration': 30,
                'is_available': True,
                'is_active': True
            },
        ]

        for doctor_data in doctors_data:
            doctor, created = Doctor.objects.get_or_create(
                email=doctor_data['email'],
                defaults=doctor_data
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created doctor: Dr. {doctor.first_name} {doctor.last_name}'))
                
                # Create schedules for the doctor (Monday to Saturday)
                schedules = [
                    {'day': 0, 'start': '09:00:00', 'end': '13:00:00'},  # Monday
                    {'day': 1, 'start': '09:00:00', 'end': '13:00:00'},  # Tuesday
                    {'day': 2, 'start': '09:00:00', 'end': '13:00:00'},  # Wednesday
                    {'day': 3, 'start': '09:00:00', 'end': '13:00:00'},  # Thursday
                    {'day': 4, 'start': '09:00:00', 'end': '13:00:00'},  # Friday
                    {'day': 5, 'start': '09:00:00', 'end': '12:00:00'},  # Saturday
                ]
                
                for schedule in schedules:
                    DoctorSchedule.objects.get_or_create(
                        doctor=doctor,
                        day_of_week=schedule['day'],
                        defaults={
                            'start_time': schedule['start'],
                            'end_time': schedule['end'],
                            'is_active': True
                        }
                    )
            else:
                self.stdout.write(f'Doctor already exists: Dr. {doctor.first_name} {doctor.last_name}')

        # Create Sample News Articles
        news_data = [
            {
                'title': 'Advanced LASIK Technology Now Available at Gopala Nethralaya',
                'slug': 'advanced-lasik-technology-available',
                'excerpt': 'We are proud to announce the arrival of state-of-the-art LASIK technology, offering safer and more precise vision correction procedures.',
                'content': '''We are excited to announce that Gopala Nethralaya has acquired the latest LASIK technology to provide our patients with the most advanced vision correction procedures available today.

Our new equipment features:
- Bladeless LASIK for enhanced safety
- Wavefront-guided treatments for superior visual outcomes
- Faster recovery times
- Customized treatments for each patient

This investment reflects our commitment to providing world-class eye care to our community. Our experienced surgeons have undergone specialized training to utilize this advanced technology effectively.

Schedule a consultation today to learn if LASIK is right for you!''',
                'author': 'Dr. Naveen Gopal',
                'is_published': True,
                'is_featured': True,
                'published_date': timezone.now() - timedelta(days=5)
            },
            {
                'title': 'Free Eye Screening Camp This Weekend',
                'slug': 'free-eye-screening-camp-weekend',
                'excerpt': 'Join us for a free comprehensive eye screening camp on Saturday and Sunday. Early detection can prevent vision loss.',
                'content': '''Gopala Nethralaya is organizing a free eye screening camp this weekend!

Date: This Saturday & Sunday
Time: 9:00 AM - 4:00 PM
Venue: Gopala Nethralaya, Basaveshwar Nagar

Services offered:
- Comprehensive eye examination
- Cataract screening
- Glaucoma detection
- Diabetic retinopathy screening
- Vision testing for children

Our team of experienced ophthalmologists will be available to examine and provide consultations. Don't miss this opportunity to get your eyes checked for free!

Please bring any previous medical records and prescriptions. Walk-ins are welcome, but appointments are preferred to avoid waiting.

Call +91 6362727509 to book your slot!''',
                'author': 'Gopala Nethralaya Team',
                'is_published': True,
                'is_featured': True,
                'published_date': timezone.now() - timedelta(days=3)
            },
            {
                'title': 'Understanding Diabetic Retinopathy: Prevention and Treatment',
                'slug': 'understanding-diabetic-retinopathy',
                'excerpt': 'Diabetic retinopathy is a leading cause of vision loss. Learn about prevention, early detection, and treatment options.',
                'content': '''Diabetic retinopathy is a diabetes complication that affects the eyes. It is caused by damage to the blood vessels of the light-sensitive tissue at the back of the eye (retina).

Warning Signs:
- Blurred or fluctuating vision
- Floaters or dark spots
- Difficulty seeing at night
- Loss of central vision

Prevention Tips:
1. Maintain good blood sugar control
2. Regular eye examinations (at least once a year)
3. Control blood pressure and cholesterol
4. Don't smoke
5. Exercise regularly

Treatment Options:
- Laser therapy
- Anti-VEGF injections
- Vitrectomy surgery

At Gopala Nethralaya, our retina specialists use advanced imaging and treatment techniques to manage diabetic retinopathy effectively. Early detection and treatment can prevent severe vision loss.

If you have diabetes, schedule your comprehensive eye examination today!''',
                'author': 'Dr. Priya Sharma',
                'is_published': True,
                'is_featured': False,
                'published_date': timezone.now() - timedelta(days=10)
            },
            {
                'title': 'Cataract Surgery: What to Expect',
                'slug': 'cataract-surgery-what-to-expect',
                'excerpt': 'A comprehensive guide to cataract surgery, including preparation, procedure, and recovery.',
                'content': '''Cataract surgery is one of the most common and successful surgical procedures performed today. At Gopala Nethralaya, we perform advanced phacoemulsification cataract surgery with premium intraocular lenses.

Before Surgery:
- Comprehensive eye examination
- Measurements for lens selection
- Medical clearance if required
- Pre-operative instructions

During Surgery:
- Procedure takes 15-20 minutes
- Performed under local anesthesia
- Painless and comfortable
- No injections required (topical anesthesia)

After Surgery:
- Improved vision within 24 hours
- Minimal restrictions on daily activities
- Eye drops for 4 weeks
- Follow-up visits as scheduled

Premium Lens Options:
- Monofocal lenses
- Multifocal lenses (freedom from glasses)
- Toric lenses (for astigmatism)

Our experienced surgeons have performed thousands of successful cataract surgeries. We use the latest technology to ensure the best visual outcomes for our patients.

Contact us to schedule your cataract evaluation!''',
                'author': 'Dr. Naveen Gopal',
                'is_published': True,
                'is_featured': False,
                'published_date': timezone.now() - timedelta(days=15)
            },
            {
                'title': 'New Pediatric Eye Care Services',
                'slug': 'new-pediatric-eye-care-services',
                'excerpt': 'We are pleased to introduce specialized pediatric eye care services for children of all ages.',
                'content': '''Gopala Nethralaya is proud to announce the launch of our dedicated Pediatric Ophthalmology department!

Services for Children:
- Comprehensive eye examinations
- Amblyopia (lazy eye) treatment
- Squint (strabismus) correction
- Vision screening for newborns
- Pediatric cataract surgery
- Glasses prescription for children

Why Choose Us:
- Child-friendly environment
- Specialized equipment for children
- Experienced pediatric ophthalmologist
- Gentle and caring approach
- Parent education and support

Common Childhood Eye Problems:
- Refractive errors (myopia, hyperopia)
- Lazy eye (amblyopia)
- Crossed eyes (strabismus)
- Color blindness
- Congenital cataracts

Early detection and treatment of eye problems in children is crucial for proper visual development. Regular eye check-ups should start from infancy.

Dr. Anita Desai, our pediatric ophthalmologist, specializes in children's eye care and is available for consultations.

Book an appointment for your child today!''',
                'author': 'Dr. Anita Desai',
                'is_published': True,
                'is_featured': False,
                'published_date': timezone.now() - timedelta(days=7)
            },
        ]

        for news_item in news_data:
            news, created = News.objects.get_or_create(
                slug=news_item['slug'],
                defaults=news_item
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created news: {news.title}'))
            else:
                self.stdout.write(f'News already exists: {news.title}')

        self.stdout.write(self.style.SUCCESS('\n✓ Sample data populated successfully!'))
        self.stdout.write(self.style.SUCCESS(f'✓ Created {Doctor.objects.count()} doctors'))
        self.stdout.write(self.style.SUCCESS(f'✓ Created {News.objects.count()} news articles'))


