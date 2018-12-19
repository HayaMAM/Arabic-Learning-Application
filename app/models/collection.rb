class Collection < ApplicationRecord
    has_many :words
    mount_uploader :image, ImageUploader
end
