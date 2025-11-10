from infrastructure.common.impls.password_hasher_impl import PasswordHasherImpl


def create_base_users(User, Role, UserRole):
    admin_role, _ = Role.get_or_create(
        name = "ADMIN"
    )

    customer_role, _ = Role.get_or_create(
        name = "CUSTOMER"
    )

    base_admin, _ = User.get_or_create(
        username = 'admin',
        defaults={    
            "email_address": 'psina@pisos.kpk',
            "phone_number": '88001007393',
            "password_hash": PasswordHasherImpl.hash('12345')
        }
    )

    _, _ = UserRole.get_or_create(
        user = base_admin,
        role = admin_role
    )
