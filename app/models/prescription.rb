class Prescription < ActiveRecord::Base
  validates :user_id, :name, :right_sph, :right_cyl, :right_axis, :left_sph, 
            :left_cyl, :left_axis, presence: true
            
  validates :right_axis, :left_axis, numericality: {
    greater_than: 0, 
    less_than_or_equal_to: 180
  }   
  
  validate :sphere_values, :cylinder_values, :bc_values, :diam_values
  
  belongs_to :user
  
  private
  
  def contacts_check
    valid = true
    if [right_bc, left_bc, right_diam, left_diam].any? {|val| val.nil?}
      errors[:contacts] << "can't have empty values" 
      valid = false
    end
    valid
  end
  
  def sphere_values
    [right_sph, left_sph].each do |sph|
      errors[:sphere] << "has incorrect increment" if sph % 0.25 != 0
      errors[:sphere] << "is outside of range" if (sph).abs > 10
    end
  end
  
  def cylinder_values
    [right_cyl, left_cyl].each do |cyl|
      errors[:cylinder] << "has incorrect increment" if cyl % 0.25 != 0
      errors[:cylinder] << "is outside of range" if (cyl).abs > 10
    end
  end
  
  def bc_values
    return unless contacts
    if contacts_check
      [right_bc, left_bc].each do |bc|
        errors[:bc] << "has incorrect increment" if bc % 0.1 != 0
        errors[:bc] << "is outside of range" if (bc - 7) > 2
      end
    end
  end
  
  def diam_values
    return unless contacts
    if contacts_check
      [right_diam, left_diam].each do |diam|
        errors[:diam] << "has incorrect increment" if diam % 0.1 != 0
        errors[:diam] << "is outside of range" if (diam - 13) > 2
      end
    end
  end
  
end


#  { user_id: 1, right_sph: 10, right_cyl: 10, right_axis: 100, left_sph: 10, left_cyl: 10, left_axis: 100 }