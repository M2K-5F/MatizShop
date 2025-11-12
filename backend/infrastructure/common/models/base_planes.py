def create_base_planes(Plane, Seat):
    mc_21_plane, _ = Plane.get_or_create(
        name = 'MC-21',
        business_class_count = 12,
        economy_class_count = 40
    )

    for i in range(mc_21_plane.business_class_count):
        Seat.get_or_create(
            plane = mc_21_plane,
            seat_class = 'BUSINESS',
            seat_number = i + 1,
            seat_name = f'A{i + 1}'
        )

    
    for i in range(mc_21_plane.economy_class_count):
        Seat.get_or_create(
            plane = mc_21_plane,
            seat_class = 'ECONOMY',
            seat_number = i + 1,
            seat_name = f'B{i + 1}'
        )
    
    return mc_21_plane, mc_21_plane.business_class_count + mc_21_plane.economy_class_count 