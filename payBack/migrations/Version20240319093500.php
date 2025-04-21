<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240319093500 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Ajoute la colonne is_verified à la table user';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE user ADD is_verified TINYINT(1) NOT NULL DEFAULT 0');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE user DROP is_verified');
    }
} 