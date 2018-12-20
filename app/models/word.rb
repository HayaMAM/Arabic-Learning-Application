class Word < ApplicationRecord
    belongs_to :collection
    belongs_to :user
    mount_uploader :image, ImageUploader
    mount_uploader :audio, AudioUploader
end
