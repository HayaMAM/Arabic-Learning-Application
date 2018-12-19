class Collection < ApplicationRecord
    has_many :words, dependent: :destroy
    mount_uploader :image, ImageUploader
end
