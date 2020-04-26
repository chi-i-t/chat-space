class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
  has_many :likes, dependent: :destroy
  def like_user(user_id)
   likes.find_by(user_id: user_id)
  end

  validates :text, presence: true, unless: :image?  

  mount_uploader :image, ImageUploader
end
